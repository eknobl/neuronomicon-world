const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  page.on('error', err => console.log('ERROR:', err.toString()));
  
  await page.goto('http://localhost:3000/ilion', {waitUntil: 'networkidle2'});
  await new Promise(r => setTimeout(r, 2000));
  await browser.close();
})();
