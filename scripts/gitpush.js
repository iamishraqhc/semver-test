import { execSync } from 'child_process';
import gitVersion from "git-tag-version";
import packageJson from '../package.json';
import config from '../src/config/convict';
import moduleLogger from '../src/config/utils/moduleLogger';

const logger = moduleLogger('semverScript');

const majorFromConfig = config.get('semver.major');
const minorFromConfig = config.get('semver.minor');
const version = `v${packageJson.version}`;
let patch = 12;

patch = `v${majorFromConfig}.${minorFromConfig}.${patch}` === version ? patch += 1 : 0;

const newVersion = `${majorFromConfig}.${minorFromConfig}.${patch}`;

// eslint-disable-next-line max-len
execSync(`git add . && git commit -m "updated gitpush script test version v${newVersion}" && git push origin master`, { stdio:[0, 1, 2] });
execSync(`git tag -a v${newVersion} -m "Test Tag v${newVersion}" && git push --tags`, { stdio:[0, 1, 2] });
// execSync(`npm version ${newVersion}`, { stdio:[0,1,2] });
logger.info(`Command executed with v${newVersion}`);
logger.info(`The tag version from github is ${gitVersion()}`);
