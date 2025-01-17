// import { WebSocket } from 'ws';

import { create } from 'zustand';
import { FitAddon } from '@xterm/addon-fit';
import { Terminal as XTerm } from '@xterm/xterm';
import { WebLinksAddon } from '@xterm/addon-web-links';
import { forwardRef, useEffect, useRef, useImperativeHandle } from 'react';
import { getTerminalTheme } from './theme';

interface TerminalState {
  showTerminal: boolean;
  toggleTerminal: (value?: boolean) => void;
}

export const useTerminalStore = create<TerminalState>((set) => ({
  showTerminal: true,
  toggleTerminal: (value?: boolean) =>
    set((state) => ({ showTerminal: value ?? !state.showTerminal })),
}));

interface WebSocketMessage {
  type: 'command' | 'response';
  data: string;
}

export interface TerminalRef {
  reloadStyles: () => void;
}

interface TerminalProps {
  className?: string;
  wsEndpoint: string;
  readonly?: boolean;
  onTerminalReady?: (terminal: XTerm) => void;
  onTerminalResize?: (cols: number, rows: number) => void;
}

export const Terminal = forwardRef<TerminalRef, TerminalProps>(
  ({ className, wsEndpoint, readonly, onTerminalReady, onTerminalResize }, ref) => {
    const terminalElementRef = useRef<HTMLDivElement>(null);
    const terminalRef = useRef<XTerm>();
    const wsRef = useRef<WebSocket>();
    const inputBufferRef = useRef<string>('');

    useEffect(() => {
      if (!terminalElementRef.current) return;

      const fitAddon = new FitAddon();
      const webLinksAddon = new WebLinksAddon();

      const terminal = new XTerm({
        cursorBlink: true,
        convertEol: true,
        disableStdin: readonly,
        // theme: {
        //   background: '#1e1e1e',
        //   foreground: '#d4d4d4',
        //   cursor: readonly ? '#00000000' : '#ffffff',
        // },
        theme: getTerminalTheme(readonly ? { cursor: '#00000000' } : {}),
        fontSize: 12,
        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      });

      terminalRef.current = terminal;

      terminal.loadAddon(fitAddon);
      terminal.loadAddon(webLinksAddon);
      terminal.open(terminalElementRef.current);

      const ws = new WebSocket(wsEndpoint);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket connected');
        terminal.write('Connected to server\r\n');
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        terminal.write('Connection error\r\n');
      };

      ws.onclose = () => {
        console.log('WebSocket closed');
        terminal.write('Connection closed\r\n');
      };

      ws.onmessage = (event) => {
        console.log('🚀 ~ useEffect ~ event:', event.data);
        
        // const message: WebSocketMessage = JSON.parse(event.data.toString());
        // if (message.type === 'response') {
        //   terminal.write(`${message.data}\r\n`);
        // }
        if (event.data) {
          // terminal.write(`${event.data}\r\n`);
          terminal.write(`${event.data}`);

        }
      };

      terminal.onData((data) => {
        if (readonly || !ws) return;

        // 检查ws链接状态
        if (ws.readyState !== WebSocket.OPEN) {
          terminal.write('\r\nNot connected to server\r\n');
          return;
        }



        if (data === '\r') {
          // Enter key
          const command = inputBufferRef.current;
          // ws.send(JSON.stringify({ type: 'command', data: command }));
          ws.send(command);
          inputBufferRef.current = '';
          terminal.write('\r\n');
        } else if (data === '\u007f') {
          // Backspace
          if (inputBufferRef.current.length > 0) {
            inputBufferRef.current = inputBufferRef.current.slice(0, -1);
            terminal.write('\b \b');
          }
        } else {
          inputBufferRef.current += data;
          terminal.write(data);
        }
      });

      const resizeObserver = new ResizeObserver(() => {
        fitAddon.fit();
        onTerminalResize?.(terminal.cols, terminal.rows);
      });

      resizeObserver.observe(terminalElementRef.current);

      onTerminalReady?.(terminal);

      // eslint-disable-next-line consistent-return
      return () => {
        resizeObserver.disconnect();
        terminal.dispose();
        ws.close();
      };
    }, [onTerminalReady, onTerminalResize, readonly, wsEndpoint]);

    useImperativeHandle(ref, () => ({
      reloadStyles: () => {
        const terminal = terminalRef.current;
        if (terminal) {
          // terminal.options.theme = {
          //   background: '#1e1e1e',
          //   foreground: '#d4d4d4',
          //   cursor: readonly ? '#00000000' : '#ffffff',
          // };
        }
      },
    }));

    return <div className={className} ref={terminalElementRef} />;
  }
);
