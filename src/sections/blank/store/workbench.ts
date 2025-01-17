import { atom, map, type MapStore, type ReadableAtom, type WritableAtom } from 'nanostores';

import { TerminalStore } from './terminal';

export const webcontainer: Promise<any> = new Promise(() => {
  // noop for ssr
});

export interface ITerminal {
  readonly cols?: number;
  readonly rows?: number;

  reset: () => void;
  write: (data: string) => void;
  onData: (cb: (data: string) => void) => void;
}

export interface ArtifactState {
  id: string;
  title: string;
  closed: boolean;
}

export type ArtifactUpdateState = Pick<ArtifactState, 'title' | 'closed'>;

export type WorkbenchViewType = 'code' | 'preview';

export class WorkbenchStore {
  #terminalStore = new TerminalStore(webcontainer);

  showWorkbench: WritableAtom<boolean> = import.meta.hot?.data.showWorkbench ?? atom(false);

  constructor() {
    if (import.meta.hot) {
      import.meta.hot.data.showWorkbench = this.showWorkbench;
    }
  }

  get showTerminal() {
    return this.#terminalStore.showTerminal;
  }

  toggleTerminal(value?: boolean) {
    this.#terminalStore.toggleTerminal(value);
  }

  attachTerminal(terminal: ITerminal) {
    this.#terminalStore.attachTerminal(terminal);
  }

  onTerminalResize(cols: number, rows: number) {
    this.#terminalStore.onTerminalResize(cols, rows);
  }

  setShowWorkbench(show: boolean) {
    this.showWorkbench.set(show);
  }
}

export const workbenchStore = new WorkbenchStore();
