import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import * as esbuild from 'esbuild';
import {transformAsync} from '@babel/core';
import stylexPlugin from '@stylexjs/babel-plugin';
import sharp from 'sharp';

const root = process.cwd();
const repo = path.resolve(root, '.cache/astryx');
const tpl = path.join(repo, 'packages/cli/assets/templates');
const nm = path.join(root, 'node_modules');
const vendor = path.join(root, 'src/vendor');
const out = path.join(root, 'out');
fs.rmSync(vendor, {recursive: true, force: true});
fs.rmSync(out, {recursive: true, force: true});
fs.mkdirSync(out, {recursive: true});
fs.cpSync(path.join(tpl, 'blocks'), path.join(vendor, 'blocks'), {recursive: true});
fs.cpSync(path.join(tpl, 'pages'), path.join(vendor, 'pages'), {recursive: true});
fs.cpSync(path.join(repo, 'packages/template-icons'), path.join(vendor, 'template-icons'), {recursive: true});

const load = async f => (fs.existsSync(f) ? await import(pathToFileURL(f).href) : null);

// component name -> category, from the core package's own docs
const category = {};
const coreSrc = path.join(nm, '@astryxdesign/core/src');
for (const d of fs.readdirSync(coreSrc, {withFileTypes: true})) {
  if (!d.isDirectory()) continue;
  for (const f of fs.readdirSync(path.join(coreSrc, d.name))) {
    if (!f.endsWith('.doc.mjs')) continue;
    const m = await load(path.join(coreSrc, d.name, f));
    const doc = m?.docs;
    if (!doc?.category) continue;
    for (const n of [doc.name, d.name, ...(doc.components ?? []).map(c => c.name)]) {
      if (n && !category[n]) category[n] = doc.category;
    }
  }
}
const catOf = name => {
  if (category[name]) return category[name];
  const hit = Object.keys(category).filter(k => name.startsWith(k)).sort((a, b) => b.length - a.length)[0];
  return hit ? category[hit] : 'Utility';
};

const imports = [];
const components = [];
let n = 0;
const blockRoot = path.join(vendor, 'blocks/components');
for (const dir of fs.readdirSync(blockRoot).sort()) {
  const files = fs.readdirSync(path.join(blockRoot, dir)).filter(f => f.endsWith('.tsx') && !f.includes('.test.') && !fs.readFileSync(path.join(blockRoot, dir, f), 'utf8').includes("from '@astryx-docs/")).sort();
  if (!files.length) continue;
  const blocks = [];
  for (const f of files) {
    const id = `B${n++}`;
    imports.push(`import ${id} from './vendor/blocks/components/${dir}/${f.slice(0, -4)}';`);
    const m = await load(path.join(blockRoot, dir, f.replace('.tsx', '.doc.mjs')));
    const doc = m?.doc ?? {};
    const label = (doc.displayName ?? doc.name ?? f.slice(0, -4)).replace(/^[^—]+—\s*/, '');
    blocks.push({id, label, show: !!doc.isShowcase || f.endsWith('Showcase.tsx')});
  }
  blocks.sort((a, b) => b.show - a.show);
  const hookish = /^(use|create)|^Hooks$/.test(dir);
  components.push({name: dir, cat: hookish ? 'Utility' : catOf(dir), blocks});
}

const pages = [];
const pageRoot = path.join(vendor, 'pages');
for (const dir of fs.readdirSync(pageRoot).sort()) {
  if (!fs.existsSync(path.join(pageRoot, dir, 'page.tsx'))) continue;
  const id = `P${n++}`;
  imports.push(`import ${id} from './vendor/pages/${dir}/page';`);
  const m = await load(path.join(pageRoot, dir, 'template.doc.mjs'));
  pages.push({slug: dir, id, name: m?.doc?.displayName ?? dir, desc: m?.doc?.description ?? '', cat: (m?.doc?.category ?? '').split(' - ')[0]});
}

const lit = list => '[' + list + ']';
const manifest = `${imports.join('\n')}
export const components = ${lit(components.map(c => `{name:${JSON.stringify(c.name)},cat:${JSON.stringify(c.cat)},blocks:[${c.blocks.map(b => `{label:${JSON.stringify(b.label)},C:${b.id}}`)}]}`))};
export const pages = ${lit(pages.map(p => `{slug:${JSON.stringify(p.slug)},name:${JSON.stringify(p.name)},desc:${JSON.stringify(p.desc)},cat:${JSON.stringify(p.cat)},C:${p.id}}`))};
`;
fs.writeFileSync(path.join(root, 'src/manifest.js'), manifest);

const styleRules = [];
const assetRefs = new Set();
const stylex = {
  name: 'stylex',
  setup(b) {
    b.onResolve({filter: /^@astryxdesign\/template-icons/}, a => {
      const sub = a.path.replace('@astryxdesign/template-icons', '').replace(/^\//, '');
      return {path: path.join(vendor, 'template-icons', sub, 'index.js')};
    });
    b.onLoad({filter: /\/src\/vendor\/.*\.(tsx|ts|js)$/}, async a => {
      let code = fs.readFileSync(a.path, 'utf8');
      for (const m of code.matchAll(/\/template-assets\/([A-Za-z0-9_.-]+)/g)) assetRefs.add(m[1]);
      code = code.replaceAll('/template-assets/', 'template-assets/');
      const loader = a.path.endsWith('.js') ? 'js' : 'tsx';
      if (!code.includes('@stylexjs/stylex')) return {contents: code, loader};
      const r = await transformAsync(code, {
        filename: a.path,
        babelrc: false,
        configFile: false,
        parserOpts: {plugins: ['jsx', 'typescript']},
        plugins: [[stylexPlugin, {dev: false, runtimeInjection: false, treeshakeCompensation: true, unstable_moduleResolution: {type: 'commonJS', rootDir: root}}]],
      });
      styleRules.push(...(r.metadata?.stylex ?? []));
      return {contents: r.code, loader};
    });
  },
};

await esbuild.build({
  entryPoints: [path.join(root, 'src/app.tsx')],
  outfile: path.join(out, 'app.js'),
  bundle: true,
  minify: true,
  format: 'iife',
  jsx: 'automatic',
  target: 'es2022',
  nodePaths: [nm],
  define: {'process.env.NODE_ENV': '"production"'},
  plugins: [stylex],
  logLevel: 'warning',
  loader: {'.png': 'dataurl', '.svg': 'dataurl'},
});

const read = p => fs.readFileSync(path.join(nm, p), 'utf8');
const themes = ['neutral', 'butter', 'chocolate', 'matcha', 'stone', 'gothic', 'y2k'];
const css = [
  '@layer reset, astryx-base, astryx-theme;',
  read('@astryxdesign/core/src/reset.css'),
  read('@astryxdesign/core/dist/astryx.css'),
  ...themes.map(t => read(`@astryxdesign/theme-${t}/dist/theme.css`)),
  stylexPlugin.processStylexRules(styleRules, false),
  fs.readFileSync(path.join(root, 'src/shell.css'), 'utf8'),
].join('\n');
const min = await esbuild.transform(css, {loader: 'css', minify: true});
fs.writeFileSync(path.join(out, 'app.css'), min.code);

const assetSrc = path.join(repo, 'apps/docsite/public/template-assets');
fs.mkdirSync(path.join(out, 'template-assets'), {recursive: true});
const files = {'app.js': 'out/app.js', 'app.css': 'out/app.css'};
const missing = [];
for (const name of assetRefs) {
  const src = path.join(assetSrc, name);
  if (!fs.existsSync(src) || !/\.(png|jpe?g|webp)$/i.test(name)) { missing.push(name); continue; }
  await sharp(src).resize({width: 720, height: 720, fit: 'inside', withoutEnlargement: true}).webp({quality: 62}).toFile(path.join(out, 'template-assets', name));
  files[`template-assets/${name}`] = {from: `out/template-assets/${name}`, contentType: 'image/webp'};
}
// Inline the demo photos so the page ships as just app.js + app.css.
const dataUri = {};
for (const key of Object.keys(files).filter(k => k.startsWith('template-assets/'))) {
  dataUri[key.slice(16)] = 'data:image/webp;base64,' + fs.readFileSync(path.join(out, key)).toString('base64');
}
const bundle = fs.readFileSync(path.join(out, 'app.js'), 'utf8').replace(/"template-assets\/([A-Za-z0-9_.-]+)"/g, (m, name) => (dataUri[name] ? `__a[${JSON.stringify(name)}]` : m));
fs.writeFileSync(path.join(out, 'app.js'), `var __a=${JSON.stringify(dataUri)};\n${bundle}`);
fs.copyFileSync(path.join(root, 'src/index.html'), path.join(out, 'index.html'));
// index.html is for publishing as an artifact; preview.html opens straight from disk.
fs.writeFileSync(path.join(out, 'preview.html'), '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">\n' + fs.readFileSync(path.join(root, 'src/index.html'), 'utf8'));
const kb = f => Math.round(fs.statSync(path.join(out, f)).size / 1024);
console.log({components: components.length, blocks: components.reduce((a, c) => a + c.blocks.length, 0), pages: pages.length, jsKB: kb('app.js'), cssKB: kb('app.css'), assets: Object.keys(files).length - 2, missing});
