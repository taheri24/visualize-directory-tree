const dirTree = require("directory-tree");
const fs = require('fs'), path = require('path');
const p = require('puppeteer');
const data = dirTree(process.cwd());
const browserSide = fs.readFileSync(path.join(__dirname, 'browser-side.js'), { encoding: 'utf-8' });
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function start(data) {
    const browser = await p.launch({ headless: false });
    const page = await browser.newPage(path.join(__dirname, 'index.html'));
    await page.goto(path.join(__dirname, 'index.html') );
    data.ignoreNames = ['node_modules','.git'];
    await page.evaluate(dirData => Object.assign(window, { dirData }), data);
    await page.evaluate(browserSide, data);
    const clip = await page.evaluate(() => {
        const root = document.querySelector('#root');
        return { width: root.clientWidth, height: root.clientHeight, x: root.clientLeft, y: root.clientTop };
    });
    await delay(10000);
    await page.screenshot({ path: path.join(process.cwd(), 'dir.png'), clip });
    //Browser
   //await browser.close();
}
start(data);