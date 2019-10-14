import { execSync } from 'child_process';

// const mssg = `BUILD - ${process.argv[2]}`;
execSync(`git push origin master`, { stdio:[0, 1, 2] });