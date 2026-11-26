// Headless pass over every route: crashed examples, console errors, sideways scroll, a few screenshots.
const {chromium} = require('playwright-core');
const path = require('path');
(async () => {
  const url = 'file://' + path.resolve(__dirname, 'out/preview.html');
  const browser = await chromium.launch({channel: 'chrome', args: ['--allow-file-access-from-files']});
  const page = await browser.newPage({viewport: {width: 1280, height: 860}});
  const errors = new Map();
  let route = 'start';
  const note = m => { const k = m.slice(0, 150); if (!errors.has(k)) errors.set(k, route); };
  page.on('pageerror', e => note('pageerror ' + e.message));
  page.on('console', m => { if (m.type() === 'error') note('console ' + m.text()); });
  await page.goto(url);
  await page.waitForSelector('.g-nav', {timeout: 30000}).catch(() => {});
  const routes = await page.$$eval('.g-nav a', as => as.map(a => a.getAttribute('href').slice(1)));
  const failed = [];
  for (const r of routes) {
    route = r;
    await page.evaluate(h => { location.hash = h; }, r);
    await page.waitForTimeout(r.startsWith('p-') ? 350 : 140);
    const bad = await page.$$eval('.g-err', es => es.map(e => e.textContent.slice(44, 170)));
    if (bad.length) failed.push([r, bad.length, bad[0]]);
    if (!(await page.$('.g-nav'))) { failed.push([r, 'APP CRASHED']); await page.goto(url); }
  }
  console.log('routes', routes.length, 'failed', JSON.stringify(failed, null, 0));
  console.log('errors', errors.size);
  [...errors].slice(0, 25).forEach(([m, r]) => console.log(' ', r, '|', m));
  const shot = async (r, name, w = 1280, scheme = 'light') => {
    await page.setViewportSize({width: w, height: w < 600 ? 844 : 860});
    await page.emulateMedia({colorScheme: scheme});
    await page.goto(url + '#' + r);
    await page.reload();
    await page.waitForTimeout(1500);
    await page.screenshot({path: path.join(__dirname, 'out', name + '.png')});
    const over = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    console.log(name, 'sideways overflow px', over);
  };
  await shot('overview', 'shot-overview');
  await shot('extras', 'shot-extras');
  await shot('overview', 'shot-overview-phone', 390);
  await page.setViewportSize({width: 390, height: 844});
  for (const r of ['extras', 'theme', 'summary', 'c-Table', 'p-dashboard']) {
    await page.goto(url + '#' + r); await page.waitForTimeout(400);
    console.log(r, 'phone overflow', await page.evaluate(() => document.documentElement.scrollWidth - innerWidth));
  }
  await page.setViewportSize({width: 1280, height: 860});
  await page.goto(url + '#c-Button'); await page.waitForTimeout(400);
  await page.click('.g-verdict .g-yes'); await page.fill('#note-c-Button', 'thử');
  await page.goto(url + '#summary'); await page.waitForTimeout(400);
  console.log('summary after vote:', await page.inputValue('#export'));
  await page.evaluate(() => localStorage.clear());
  await browser.close();
})();
