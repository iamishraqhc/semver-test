/**
 * Used to create a log messages prior to enabling logging.
 * Works as the winston logger except that all log messages are
 * stored in an internal stack.
 * When logging is enabled the stack messages should be forwarded to the logging system.
 * @param {} initialStack - Initial log stack, normally empty
 */
const logStack = (initialStack = []) => {
  /**
   * The stack containing log messages.
   */
  let stack = [...initialStack];

  /**
   * Returns a copy of the current stack of log messages
   */
  const getStack = () => {
    return [...stack];
  };
  /**
   * Function to mimic the winston.log function
   * @param {string} level
   * @param {string} message
   */
  const log = (level, message) => {
    stack.push({ level, message });
  };
  /**
   * Function to mimic the winston.info function.
   * @param {string} message - log message
   */
  const info = message => {
    log('info', message);
  };
  /**
   * Function to mimic the winston.warn function.
   * @param {string} message - log message
   */
  const warn = message => {
    log('warn', message);
  };
  /**
   * Function to mimic the winston.error function.
   * @param {string} message - log message
   */
  const error = message => {
    log('error', message);
  };

  /**
   * Flushes the internal log message stack to the given logger.
   * After flushing the internal stack will be empty.
   */
  const flush = logger => {
    stack.forEach(logger);
    stack = [];
  };

  return {
    getStack,
    log,
    info,
    warn,
    error,
    flush,
  };
};

export default logStack;
