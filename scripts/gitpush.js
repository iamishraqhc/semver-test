const {execSync} = require('child_process').execSync;

const mssg = `BUILD - ${process.argv[2]}`;
execSync(`git push origin master  ${mssg}`, { stdio:[0, 1, 2] });