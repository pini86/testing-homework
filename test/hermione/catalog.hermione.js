const { assert } = require("chai");

describe("Catalog test", async function () {
    it("Тест Catalog", async function ({ browser }) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();

        await browser.url("http://localhost:3000/hw/store");

        await page.goto("http://localhost:3000/hw/store/catalog");

        const productItemSelector = ".ProductItem";
        await page.waitForSelector(productItemSelector, { timeout: 1000 });

        const productNameSelector = ".ProductItem-Name";
        await page.waitForSelector(productNameSelector, { timeout: 1000 });

        const productPriceSelector = ".ProductItem-Price";
        await page.waitForSelector(productPriceSelector, { timeout: 1000 });

        const productDetailsSelector = ".ProductItem-DetailsLink";
        await page.waitForSelector(productDetailsSelector, { timeout: 1000 });

        await browser.assertView("product_item_well_done", ".ProductItem", {
            ignoreElements: [
                ".Image",
                ".ProductItem-Name",
                ".ProductItem-Price",
            ],
        });
    });
});
