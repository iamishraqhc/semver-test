import convict from 'convict';
import readConfigurationFile from './utils/fileUtils';
import logStack from './utils/logStack';

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['prod', 'dev', 'test'],
    default: 'dev',
    env: 'NODE_ENV',
    arg: 'env',
  },
  no_exec: {
    doc: 'Triggers a dry-run when set to true',
    format: Boolean,
    default: true,
    env: 'NO_EXEC',
    arg: 'no-exec',
  },
  semver: {
    major: {
      doc: 'The leftmost number of a version "major.minor.patch"',
      format: String,
      default: 0,
    },
    minor: {
      doc: 'The middle number of a version "major.minor.patch"',
      format: String,
      default: 1,
    },
  },
  log: {
    morganFormat: {
      doc:
        'Format used by Morgan logging, Ref: https://github.com/expressjs/morgan',
      format: String,
      default: 'short',
    },
    console: {
      doc: 'Enable console logging',
      format: Boolean,
      default: false,
    },
    fileLevel: {
      doc: 'To configure the log level for file logging',
      format: String,
      default: 'info',
    },
    consoleLevel: {
      doc: 'To configure the log level for console logging',
      format: String,
      default: 'info',
    },
    folder: {
      doc: 'Location of the folder containing the log files',
      format: String,
      default: './logs',
    },
    fileTTL: {
      doc: 'Maximum number of logs to keep. If not set, no logs will be removed.' + 
      'This can be a number of files or number of days. If using days, add d as the suffix. (default: 14d)',
      format: String,
      default: '14d',
    },
  },
  http: {
    port: {
      doc: 'Listener port used by express',
      format: 'port',
      default: 3000,
      env: 'HTTP_PORT',
    },
    enableHTTPS: {
      doc: 'Enable or disable https',
      format: Boolean,
      default: false,
    },
  },
  mos: {
    ncsID: {
      doc: 'Unique identity for the MOS Gateway',
      format: String,
      default: 'NCSSERVER',
      env: 'MOS_NCS_ID',
    },
    lowerPort: {
      doc: 'Port number of MOS Lower Port (Media Object Metadata)',
      format: 'port',
      default: 10540,
      env: 'MOS_LOWER_PORT',
    },
    heartbeatInterval: {
      doc: 'Heartbeat interval in seconds for sending <heartbeat> to clients',
      format: 'nat', // nat: Positive integer
      default: 60,
    }, // MESSAGE_ID_FILE_PATH
    messageIdFilename: {
      doc: 'Name of file to store the latest messageId for each connection',
      format: String,
      default: './messageId.data',
    },
    encoding: {
      doc: 'Encoding used when communication with MOS clients. ' +
           'Default value according to MOS protocol',
      format: String,
      default: 'utf16-be',
    },
  },
  dina: {
    webSocketEndPoint: {
      doc: 'Dina Web Socket Endpoint address',
      format: String,
      default: 'WEB SOCKET ENDPOINT',
      env: 'DINA_WEBSOCKET_ENDPOINT',
    },
    pingInterval: {
      doc: 'Ping interval in seconds to Websocket endpoint to keep the connection alive',
      format: 'nat', // nat: Positive integer
      default: 300,   
    },
    reconnectInterval: {
      doc: 'Reconnect interval in seconds to Websocket in case of connection is closed',
      format: 'nat', // nat: Positive integer
      default: 300,
    },
    rundown : {
      duration: {
        doc: 'Number of days for which rundown should be returned from DiNA',
        format: 'nat', // nat: Positive integer
        default: 1,
      },
      startDate: {
        doc: 'Starting date from which rundown will be fetched from DiNA',
        format: String,  // YYYY-MM-dd
        default: "today",  // example: 2019-09-12 | today
      },
    },
  },
});

const logger = logStack();

readConfigurationFile(config, config.get('env'), logger);

try {
  config.validate({ allowed: 'strict' });
} catch (err) {
  logger.error(`config validation failed: ${err}`);
}

config.logger = logger;

export default config;
