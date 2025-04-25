const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: '/usr/bin/google-chrome',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    const filePath = `file://${__dirname}/main_menu.html`;
    console.log(`Opening: ${filePath}`);
    await page.goto(filePath);

    // Check page title
    const title = await page.title();
    if (title !== "Murder Mystery") {
      throw new Error(` Title mismatch. Expected "Murder Mystery" but got "${title}"`);
    }

    //  Check download button
    const buttonExists = await page.$('a.btn');
    if (!buttonExists) {
      throw new Error(" Download button not found");
    }

    //  Check background element exists
    const bgExists = await page.$eval('.background', el => !!el);
    if (!bgExists) {
      throw new Error(" Background element missing");
    }

    console.log(" Smoke tests passed successfully");
    await browser.close();

  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
})();
