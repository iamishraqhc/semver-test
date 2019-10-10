import fs from 'fs';
import logStack from './logStack';

/**
 * Reads the configuration file for the given environment.
 * The configuration files shall be located in the .\config directory
 * with the following syntax: {env}.json
 * If no matching configuration file is found the 'dev' environment is used as a fallback.
 * Note that env is obtained using the given convict config configuration.
 * @param {*} config - convict configuration to get values from configuration file.
 * @param {string} env - environment used to obtain corresponding configuration file.
 * @param {logStack} logger - logger.
 */
const readConfigurationFile = (config, env, logger = logStack()) => {
  const configFile = getConfigFile(env);
  try {
    if (!fs.existsSync(configFile)) {
      logger.warn(`Missing configuration file ${configFile} for ${env}`);
      if (env !== 'dev') {
        readConfigurationFile(config, 'dev', logger);
      }
      return;
    }
    logger.info(`Reading configuration file: ${env} ${configFile}`);
    config.loadFile(configFile);
  } catch (err) {
    logger.error(`Loading configuration file ${configFile} failed: ${err}`);
    if (env !== 'dev') {
      readConfigurationFile(config, 'dev', logger);
    }
  }
};

/**
 * Returns name of configuration file in ./config folder.
 * @param {*} env - Selected enviroment
 * @returns configuration file name
 */
const getConfigFile = env => {
  return `./config/${env}.json`;
};

export default readConfigurationFile;
