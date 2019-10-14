import config from '../src/config/convict';
import moduleLogger from '../src/config/utils/moduleLogger';

const logger = moduleLogger('script');

const { exec } = require('child_process').execSync;
const { performance } = require('perf_hooks');

function shellcmd(cmd) {
  logger.info(`${cmd}`);

  const noExec = config.get('no_exec');
  if (noExec) return;

  const tStart = performance.now();
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      logger.error(`Not able to execute command: ${err}`);
      return;
    }
    if (stdout) {
      logger.info(String(stdout).trim());
    }
    if (stderr) {
      logger.error(String(stderr).trim());
    }

    const tEnd = performance.now();
    const timeElapsed = tEnd - tStart;
    logger.info(`Command executed in ${timeElapsed} msec`);
  });
}

export default shellcmd;
