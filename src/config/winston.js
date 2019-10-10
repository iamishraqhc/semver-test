import winston from 'winston';
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';
import config from './convict';

const { combine, timestamp, printf, colorize, json } = winston.format;

/** Set up the various transports used for logging. */
const transports = [
  /** As main transport use a rotating file. New file every hour. Log json format directly */
  new DailyRotateFile({
    name: 'file',
    datePattern: 'YYYY-MM-DDTHH',
    filename: path.join(config.get('log.folder'), '7m-mos-gateway-%DATE%.json'),
    format: combine(timestamp(), json()),
    level: config.get('log.fileLevel'),
    zippedArchive: false,
    maxFiles: config.get('log.fileTTL'),
  }).on('new', newFileName => {
    logger.info(`The current file is ${newFileName}`);
  }).on('logRemoved', removedFileName => {
    logger.info(`The removed file is ${removedFileName}`);
  }).on('rotate', (oldFileName, newFileName) => {
    logger.info(`The previous log file is ${oldFileName}`);
    logger.info(`The new log file is ${newFileName}`);
  }),
];


/** Add logging to console either in development mode or explicit required */
const env = config.get('env');
if (env === 'dev' || config.get('log.console')) {
  const consoleTransport = new winston.transports.Console({
    format: combine(
      colorize(),
      timestamp(),
      printf(info => {
        const module = info.module ? `[${info.module}] ` : ``;
        return `${info.timestamp} ${info.level} ${module}${info.message}`;
      }),
    ),
    level: config.get('log.consoleLevel'),
  });
  transports.push(consoleTransport);
}

/** Create the main logger */
const logger = winston.createLogger({ transports });

/** The stream is used to forward log messages from the morgan logging */
logger.stream = {
  write: message => {
    logger.log({ level: 'info', message: message.trim(), module: 'http', location: 'stream' });
  },
};

logger.info(`Logging started, environment=${env}`);

export default logger;
