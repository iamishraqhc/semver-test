import { execSync } from 'child_process';

execSync(`git add . && git commit -m "updated gitpush script" && git push origin master`, { stdio:[0, 1, 2] });