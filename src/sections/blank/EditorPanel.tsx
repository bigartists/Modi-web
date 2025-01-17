import { useStore } from '@nanostores/react';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
  type ImperativePanelHandle,
} from 'react-resizable-panels';

import { IconButton } from './components/ui/IconButton';
import { PanelHeader } from './components/ui/PanelHeader';

import { shortcutEventEmitter } from './hooks/useShortcuts';
import { themeStore } from './store/theme';
import { workbenchStore } from './store/workbench';
import { classNames } from './utils/classNames';

import { renderLogger } from './utils/logger';

import { Terminal, type TerminalRef } from './terminal/Terminal';

const MAX_TERMINALS = 3;
const DEFAULT_TERMINAL_SIZE = 25;
const DEFAULT_EDITOR_SIZE = 100 - DEFAULT_TERMINAL_SIZE;

export const EditorPanel = memo((props: any) => {
  renderLogger.trace('EditorPanel');

  const theme = useStore(themeStore);
  const showTerminal = useStore(workbenchStore.showTerminal);

  const terminalRefs = useRef<Array<TerminalRef | null>>([]);
  const terminalPanelRef = useRef<ImperativePanelHandle>(null);
  const terminalToggledByShortcut = useRef(false);

  const [activeTerminal, setActiveTerminal] = useState(0);
  const [terminalCount, setTerminalCount] = useState(1);

  useEffect(() => {
    const unsubscribeFromEventEmitter = shortcutEventEmitter.on('toggleTerminal', () => {
      terminalToggledByShortcut.current = true;
    });

    const unsubscribeFromThemeStore = themeStore.subscribe(() => {
      // eslint-disable-next-line no-restricted-syntax
      for (const ref of Object.values(terminalRefs.current)) {
        ref?.reloadStyles();
      }
    });

    return () => {
      unsubscribeFromEventEmitter();
      unsubscribeFromThemeStore();
    };
  }, []);

  useEffect(() => {
    const { current: terminal } = terminalPanelRef;

    if (!terminal) {
      return;
    }

    const isCollapsed = terminal.isCollapsed();

    if (!showTerminal && !isCollapsed) {
      terminal.collapse();
    } else if (showTerminal && isCollapsed) {
      terminal.resize(DEFAULT_TERMINAL_SIZE);
    }

    terminalToggledByShortcut.current = false;
  }, [showTerminal]);

  const addTerminal = () => {
    if (terminalCount < MAX_TERMINALS) {
      setTerminalCount(terminalCount + 1);
      setActiveTerminal(terminalCount);
    }
  };

  return (
    <PanelGroup direction="vertical">
      <Panel defaultSize={showTerminal ? DEFAULT_EDITOR_SIZE : 100} minSize={20}>
        <PanelGroup direction="horizontal">
          <Panel defaultSize={20} minSize={10} collapsible>
            <div className="flex flex-col border-r border-bolt-elements-borderColor h-full">
              <PanelHeader>
                <div className="i-ph:tree-structure-duotone shrink-0" />
                Files
              </PanelHeader>
              <h1>filetree</h1>
            </div>
          </Panel>
          <PanelResizeHandle />
          <Panel className="flex flex-col" defaultSize={80} minSize={20}>
            <PanelHeader className="overflow-x-auto">
              <h1>save reset</h1>
            </PanelHeader>
            <div className="h-full flex-1 overflow-hidden">
              <h1>CodeMirrorEditor</h1>
            </div>
          </Panel>
        </PanelGroup>
      </Panel>
      <PanelResizeHandle />
      <Panel
        ref={terminalPanelRef}
        defaultSize={showTerminal ? DEFAULT_TERMINAL_SIZE : 0}
        minSize={10}
        collapsible
        onExpand={() => {
          if (!terminalToggledByShortcut.current) {
            workbenchStore.toggleTerminal(true);
          }
        }}
        onCollapse={() => {
          if (!terminalToggledByShortcut.current) {
            workbenchStore.toggleTerminal(false);
          }
        }}
      >
        <div className="h-full">
          <div className="bg-bolt-elements-terminals-background h-full flex flex-col">
            <div className="flex items-center bg-bolt-elements-background-depth-2 border-y border-bolt-elements-borderColor gap-1.5 min-h-[34px] p-2">
              {Array.from({ length: terminalCount }, (_, index) => {
                const isActive = activeTerminal === index;

                return (
                  // eslint-disable-next-line react/button-has-type
                  <button
                    key={index}
                    className={classNames(
                      'flex items-center text-sm cursor-pointer gap-1.5 px-3 py-2 h-full whitespace-nowrap rounded-full',
                      {
                        'bg-bolt-elements-terminals-buttonBackground text-bolt-elements-textPrimary':
                          isActive,
                        'bg-bolt-elements-background-depth-2 text-bolt-elements-textSecondary hover:bg-bolt-elements-terminals-buttonBackground':
                          !isActive,
                      }
                    )}
                    onClick={() => setActiveTerminal(index)}
                  >
                    <div className="i-ph:terminal-window-duotone text-lg" />
                    Terminal {terminalCount > 1 && index + 1}
                  </button>
                );
              })}
              {terminalCount < MAX_TERMINALS && (
                <IconButton icon="i-ph:plus" size="md" onClick={addTerminal} />
              )}
              <IconButton
                className="ml-auto"
                icon="i-ph:caret-down"
                title="Close"
                size="md"
                onClick={() => workbenchStore.toggleTerminal(false)}
              />
            </div>
            {Array.from({ length: terminalCount }, (_, index) => {
              const isActive = activeTerminal === index;

              return (
                <Terminal
                  key={index}
                  className={classNames('h-full overflow-hidden', {
                    hidden: !isActive,
                  })}
                  ref={(ref) => {
                    terminalRefs.current.push(ref);
                  }}
                  // onTerminalReady={(terminal) => workbenchStore.attachTerminal(terminal)}
                  // onTerminalResize={(cols, rows) => workbenchStore.onTerminalResize(cols, rows)}
                  theme={theme}
                />
              );
            })}
          </div>
        </div>
      </Panel>
    </PanelGroup>
  );
});
