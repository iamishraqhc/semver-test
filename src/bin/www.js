/* eslint-disable no-unused-vars */
/**
 * Module dependencies.
 */

import http from 'http';
import app from '../app';
import config from '../config';
import createHttpsServer from './httpsServer';
import moduleLogger from '../config/utils/moduleLogger';

/**
 * Get port from environment and store in Express.
 */
const port = config.get('http.port');
app.set('port', port);


const logger = moduleLogger('http');

/**
 * Create HTTP server.
 */

const createServer = () => {
  if (config.get('http.enableHTTPS')) {
    logger.info(`using https server`);
    return createHttpsServer(app);
  }
  logger.info(`using http server`);
  return http.createServer(app);
}

const server = createServer();

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(`${error.port} requires elevated privileges`);
      process.exit(0);
      break;
    case 'EADDRINUSE':
      logger.error(`Port ${error.port} is already in use`);
      process.exit(0);
      break;
    default:
      logger.error(`server error, 
      exiting: ${error.code}: ${error.message}`);
      process.exit(0);
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening(serv) {
  const addr = server.address();
  const bind = addr.port;
  logger.info(`Listening on ${bind}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
