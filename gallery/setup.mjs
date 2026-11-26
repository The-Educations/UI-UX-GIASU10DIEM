// Fetch only the parts of Astryx the gallery needs, at the pinned commit.
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';

const dir = '.cache/astryx';
const git = (...a) => execFileSync('git', ['-C', dir, ...a], {stdio: 'inherit'});
fs.rmSync(dir, {recursive: true, force: true});
fs.mkdirSync(dir, {recursive: true});
git('init', '-q');
git('remote', 'add', 'origin', 'https://github.com/meta/astryx.git');
git('sparse-checkout', 'set', 'packages/cli/assets/templates', 'packages/template-icons', 'apps/docsite/public/template-assets');
git('fetch', '-q', '--depth', '1', '--filter=blob:none', 'origin', '3fd98b28b8a6165b491648f39fde028598730a64');
git('checkout', '-q', 'FETCH_HEAD');
