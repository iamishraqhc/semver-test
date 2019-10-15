// import { execSync } from 'child_process';
import gitVersion from "git-tag-version";
import config from '../src/config/convict';
import moduleLogger from '../src/config/utils/moduleLogger';

const logger = moduleLogger('semverScript');

const majorFromConfig = config.get('semver.major');
const minorFromConfig = config.get('semver.minor');
const version = 'v0.0.9';
let patch = 8;

patch = `v${majorFromConfig}.${minorFromConfig}.9` === version ? patch += 1 : 0;

const newVersion = `v${majorFromConfig}.${minorFromConfig}.${patch}`;

// eslint-disable-next-line max-len
// execSync(`git add . && git commit -m "updated gitpush script test 4" && git push origin master`, { stdio:[0, 1, 2] });
// execSync(`git tag -a ${newVersion} -m "Test Tag ${newVersion}" && git push --tags`, { stdio:[0, 1, 2] });
logger.info(`Command executed with ${newVersion}`);
logger.info(`The tag version from github is ${gitVersion()}`);