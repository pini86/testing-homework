const { assert } = require("chai");

describe("Adaptive test", async function () {
    it("Тест Adaptive screen width 575", async function ({ browser }) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await page.setViewport({ width: 575, height: 1024 });

        await browser.url("http://localhost:3000/hw/store");

        const appSelector = ".Application";
        await page.waitForSelector(appSelector, {
            timeout: 1000,
        });
        await browser.assertView("adaptive_575_well_done", ".Application", {
            ignoreElements: [".Home"],
        });
    });
    it("Тест Adaptive screen width 768", async function ({ browser }) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await page.setViewport({ width: 768, height: 1024 });

        await browser.url("http://localhost:3000/hw/store");

        const appSelector = ".Application";
        await page.waitForSelector(appSelector, {
            timeout: 1000,
        });
        await browser.assertView("adaptive_768_well_done", ".Application", {
            ignoreElements: [".Home"],
        });
    });
    it("Тест Adaptive screen width 992", async function ({ browser }) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await page.setViewport({ width: 992, height: 1024 });

        await browser.url("http://localhost:3000/hw/store");

        const appSelector = ".Application";
        await page.waitForSelector(appSelector, {
            timeout: 1000,
        });
        await browser.assertView("adaptive_992_well_done", ".Application", {
            ignoreElements: [".Home"],
        });
    });
    it("Тест Adaptive screen width 1200", async function ({ browser }) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await page.setViewport({ width: 1200, height: 1024 });

        await browser.url("http://localhost:3000/hw/store");

        const appSelector = ".Application";
        await page.waitForSelector(appSelector, {
            timeout: 1000,
        });
        await browser.assertView("adaptive_1200_well_done", ".Application", {
            ignoreElements: [".Home"],
        });
    });
    it("Тест Adaptive screen width 1400", async function ({ browser }) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await page.setViewport({ width: 1400, height: 1024 });

        await browser.url("http://localhost:3000/hw/store");

        const appSelector = ".Application";
        await page.waitForSelector(appSelector, {
            timeout: 1000,
        });
        await browser.assertView("adaptive_1400_well_done", ".Application", {
            ignoreElements: [".Home"],
        });
    });
});
