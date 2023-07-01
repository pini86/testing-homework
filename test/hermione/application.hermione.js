const { assert } = require("chai");

describe("Navbar test", async function () {
    it("Тест Navbar BUG_ID=4", async function ({ browser }) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await page.setViewport({ width: 575, height: 1024 });

        let BUG_ID = "";
        // Для тестирования с багом разкомментировать строку ниже
        //BUG_ID = "/?bug_id=4";

        await browser.url("http://localhost:3000/hw/store" + BUG_ID);

        const toglerSelector = ".Application-Toggler";
        await page.waitForSelector(toglerSelector);
        await page.click(toglerSelector);

        const appMenuSelector = ".Application-Menu";
        await page.waitForSelector(appMenuSelector);

        const navLinkSelector = ".nav-link";
        await page.waitForSelector(navLinkSelector);
        await page.click(navLinkSelector);

        const appSelector = ".navbar";
        await page.waitForSelector(appSelector, {
            timeout: 1000,
        });

        await browser.assertView("navbar_well_done", ".navbar ");
    });
});
