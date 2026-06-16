import {Before, After, setDefaultTimeout} from '@cucumber/cucumber';
import {chromium, Browser, Page} from '@playwright/test';

setDefaultTimeout(60000);

export let browser: Browser;
export let page: Page;

Before(async () => {

    browser = await chromium.launch({headless: false});
    page = await browser.newPage();
});

After(async () => {

    if (page)
        await page.close();

    if (browser)
        await browser.close();
});