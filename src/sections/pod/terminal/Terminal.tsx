// import { WebSocket } from 'ws';

import { create } from 'zustand';
import { FitAddon } from '@xterm/addon-fit';
import { Terminal as XTerm } from '@xterm/xterm';
import { WebLinksAddon } from '@xterm/addon-web-links';
import { forwardRef, useEffect, useRef, useImperativeHandle } from 'react';
import { getTerminalTheme } from './theme';
import "@xterm/xterm/css/xterm.css"

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

    

      ws.onmessage = async (event) => {
        if (event.data) {
          try { 
            let outputText: string;
            
            if (event.data instanceof Blob) {
              outputText = await event.data.text();
            } else if (typeof event.data === 'string' && event.data.startsWith('{')) {
              const jsonData = JSON.parse(event.data);
              outputText = jsonData.data || jsonData.message || event.data;
              console.log('JSON content:', outputText);
            } else {
              outputText = event.data.toString();
              console.log('String content:', outputText);
            }
            
            // 写入终端
            terminal.write(outputText);
            
         
          } catch (error) {
            console.error('Error processing terminal output:', error);
            terminal.write('\r\nError displaying output\r\n');
          }
        }
      };


      // 添加一个函数来重置终端状态
      const resetTerminalState = () => {
        inputBufferRef.current = '';
        terminal.write('\r\n');  // 确保光标在新行
      };

      terminal.onData((data) => {
        if (readonly || !ws) return;

        if (ws.readyState !== WebSocket.OPEN) {
          terminal.write('\r\nNot connected to server\r\n');
          return;
        }

        try {
          ws.send(data)
        } catch (error) {
          console.error(error)
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

    return <div className="h-full" ref={terminalElementRef} />;
  }
);
