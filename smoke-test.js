// smoke-test.js
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`file://${__dirname}/main_menu.html`);

  // Title check
  const title = await page.title();
  if (title !== "Murder Mystery") throw new Error("Title mismatch");

  // Download button check
  const buttonExists = await page.$('a.btn');
  if (!buttonExists) throw new Error("Download button not found");

  // Background CSS check
  const bgExists = await page.$eval('.background', el => !!el);
  if (!bgExists) throw new Error("Background element missing");

  console.log("Smoke tests passed");
  await browser.close();
})();
