import https from 'https';
import http from 'http';
import fs from 'fs';
import moduleLogger from '../config/utils/moduleLogger';

const logger = moduleLogger('http');

const getHttpsOptions = () => {
  const keyfile = 'security/cert.key';
  const certfile = 'security/cert.pem';
  return {
    key: fs.readFileSync(keyfile),
    cert: fs.readFileSync(certfile),
  }
}

const createHttpsServer = (app) => {
  try {
    return https.createServer(getHttpsOptions(), app);
  }
  catch (err) {
    logger.error(`error when creating https server:${err}`);
    logger.error(`Please read the ReadMe file to generate` 
                +  ` and use these files in this app.`);
    logger.info(`reverting to use http server`);
    return http.createServer(app);
  }
}

export default createHttpsServer;