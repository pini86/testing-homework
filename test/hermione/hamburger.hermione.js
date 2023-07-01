const { assert } = require("chai");

describe("Hamburger test", async function () {
    it("Тест Humburger screen width<576", async function ({ browser }) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await page.setViewport({ width: 575, height: 1024 });

        await browser.url("http://localhost:3000/hw/store");

        const toglerSelector = ".Application-Toggler";
        await page.waitForSelector(toglerSelector, {
            timeout: 1000,
        });
        await browser.assertView("hamburger_well_done", ".Application-Toggler");
    });
});
