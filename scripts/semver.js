import gitVersion from 'git-tag-version';
import config from '../src/config/convict';
import execute from './shellcmd';
import moduleLogger from '../src/config/utils/moduleLogger';

const logger = moduleLogger('semverScript');

const majorFromConfig = config.get('semver.major');
const minorFromConfig = config.get('semver.minor');
const version = 'v0.0.1';
let patch = 0;

patch = `v${majorFromConfig}.${minorFromConfig}.1` === version ? patch += 1 : 0;

const newVersion = `v${majorFromConfig}.${minorFromConfig}.${patch}`;

// execute(`git tag -a ${newVersion} -m "Test Tag v0.0.2"`);
execute(`git push origin master`);

logger.info(`Command executed with ${newVersion}`);
logger.info(gitVersion());
const gitMaster = (JSON.stringify(gitVersion())).substr(1,6);
logger.info(gitMaster);