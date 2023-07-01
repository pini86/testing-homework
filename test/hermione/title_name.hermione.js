const { assert } = require("chai");

describe("Brand name is link to main page test", async function () {
    it("Тест Brand name is link", async function ({ browser }) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();

        await browser.url("http://localhost:3000/hw/store/catalog");

        const brandNameSelector = ".Application-Brand";
        await page.waitForSelector(brandNameSelector, {
            timeout: 1000,
        });
        await page.click(brandNameSelector);

        const welcomeSelector = ".display-3";
        await page.waitForSelector(welcomeSelector, {
            timeout: 1000,
        });

        await browser.assertView("main_page", ".display-3");
    });
});
