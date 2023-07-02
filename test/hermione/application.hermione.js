const { assert } = require("chai");

let BUG_ID = "";
// Для тестирования с багом можно разкомментировать строку ниже
//BUG_ID = "/?bug_id=4";

describe("Navbar test", async function () {
    it("Тест Navbar BUG_ID=4", async function ({ browser }) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await page.setViewport({ width: 575, height: 1024 });

        await browser.url("http://localhost:3000/hw/store" + BUG_ID);

        const toglerSelector = ".Application-Toggler";
        await page.waitForSelector(toglerSelector, { timeout: 1000 });
        await page.click(toglerSelector);

        const appMenuSelector = ".Application-Menu";
        await page.waitForSelector(appMenuSelector, { timeout: 1000 });

        const navLinkSelector = ".nav-link";
        await page.waitForSelector(navLinkSelector, { timeout: 1000 });
        await page.click(navLinkSelector);

        const appSelector = ".navbar";
        await page.waitForSelector(appSelector, {
            timeout: 1000,
        });

        await browser.assertView("navbar_well_done", ".navbar ");
    });
});
