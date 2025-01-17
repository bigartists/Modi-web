import type { WebContainer } from '@webcontainer/api';
import { withResolvers } from './promises';

export async function newShellProcess(webcontainer: WebContainer, terminal: any) {
  const args: string[] = [];

  // we spawn a JSH process with a fallback cols and rows in case the process is not attached yet to a visible terminal
  const process = await webcontainer.spawn('/bin/jsh', ['--osc', ...args], {
    terminal: {
      cols: terminal.cols ?? 80,
      rows: terminal.rows ?? 15,
    },
  });

  const input = process.input.getWriter();
  const output = process.output;

  const jshReady = withResolvers<void>();

  let isInteractive = false;

  output.pipeTo(
    new WritableStream({
      write(data) {
        if (!isInteractive) {
          // eslint-disable-next-line no-control-regex
          const [, osc] = data.match(/\x1b\]654;([^\x07]+)\x07/) || [];

          if (osc === 'interactive') {
            // wait until we see the interactive OSC
            isInteractive = true;

            jshReady.resolve();
          }
        }

        terminal.write(data);
      },
    })
  );

  terminal.onData((data: any) => {
    if (isInteractive) {
      input.write(data);
    }
  });

  await jshReady.promise;

  return process;
}
