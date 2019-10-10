import config from '../src/config/convict';
import execute from './shellcmd';

const majorFromConfig = config.get('semver.major');
const minorFromConfig = config.get('semver.minor');
const version = 'v0.0.0';
let patch = 0;

patch = `v${majorFromConfig}.${minorFromConfig}.0` === version ? patch += 1 : 0;

const newVersion = `v${majorFromConfig}.${minorFromConfig}.${patch}`;

execute(
    `git tag -a ${newVersion} -m "Test Tag v0.0.0"`
  );