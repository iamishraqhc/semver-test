import callsites from 'callsites';
import logger from '../winston';

const moduleLogger = (module) => {
  
  const logToWinston = (level, message, defaultLocation = '') => {
    // if defaultLocation parameter is not passed, then the exact function name will be taken from callsites
    const location =  defaultLocation || callsites()[2].getFunctionName(); 
    logger.log({ level, message, module, location });
  };

  /**
   * Function to mimic the winston.log function
   * @param {string} level
   * @param {string} message
   * @param {string} location
   */
  const log = (level, message, location = '') => {
    logToWinston( level, message, location );
  };
  
  /**
   * Function to mimic the winston.info function.
   * @param {string} message - log message
   * @param {string} location - log location
   */
  const info = (message, location='') => {
    logToWinston('info', message, location);
  };

  /**
   * Function to mimic the winston.warn function.
   * @param {string} message - log message
   * @param {string} location - log location
   */
  const warn = (message, location='') => {
    logToWinston('warn', message, location);
  };
  
  /**
   * Function to mimic the winston.error function.
   * @param {string} message - log message
   * @param {string} location - log location
   */
  const error = (message, location='') => {
    logToWinston('error', message, location);
  };

  /**
   * Function to mimic the winston.verbose function.
   * @param {string} message - log message
   * @param {string} location - log location
   */
  
  const verbose = (message, location='') => {
    logToWinston('verbose', message, location);
  }

  return {
    log,
    info,
    warn,
    error,
    verbose,
    module,
  };
};

export default moduleLogger
