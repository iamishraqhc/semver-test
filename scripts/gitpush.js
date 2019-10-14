import { execSync } from 'child_process';
import config from '../src/config/convict';
import moduleLogger from '../src/config/utils/moduleLogger';

const logger = moduleLogger('semverScript');

const majorFromConfig = config.get('semver.major');
const minorFromConfig = config.get('semver.minor');
const version = 'v0.0.7';
let patch = 6;

patch = `v${majorFromConfig}.${minorFromConfig}.7` === version ? patch += 1 : 0;

const newVersion = `v${majorFromConfig}.${minorFromConfig}.${patch}`;

execSync(`git add . && git commit -m "updated gitpush 2" && git push origin master`, { stdio:[0, 1, 2] });
execSync(`git tag -a ${newVersion} -m "Test Tag ${newVersion}" && git push --tags`, { stdio:[0, 1, 2] });
logger.info(`Command executed with ${newVersion}`);