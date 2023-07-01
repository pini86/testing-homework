const { assert } = require("chai");

let BUG_ID = "";

// Для тестирования с багом разкомментировать строку ниже
// BUG_ID = "/?bug_id=9";

describe("Product details test", async function () {
    it("Тест Product details content", async function ({ browser }) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();

        await browser.url("http://localhost:3000/hw/store" + BUG_ID);

        await page.goto("http://localhost:3000/hw/store/catalog" + BUG_ID);

        const searchResultSelector = ".ProductItem-DetailsLink";
        await page.waitForSelector(searchResultSelector, { timeout: 1000 });
        await page.click(searchResultSelector);

        const detailsSelector = ".ProductDetails";
        await page.waitForSelector(detailsSelector, { timeout: 1000 });

        const nameSelector = ".ProductDetails-Name";
        await page.waitForSelector(nameSelector, { timeout: 1000 });

        const descSelector = ".ProductDetails-Description";
        await page.waitForSelector(descSelector, { timeout: 1000 });

        const priceSelector = ".ProductDetails-Price";
        await page.waitForSelector(priceSelector, { timeout: 1000 });

        const colorSelector = ".ProductDetails-Color";
        await page.waitForSelector(colorSelector, { timeout: 1000 });

        const materialSelector = ".ProductDetails-Material";
        await page.waitForSelector(materialSelector, { timeout: 1000 });

        const buttonSelector = ".ProductDetails-AddToCart";
        await page.waitForSelector(buttonSelector, { timeout: 1000 });

        const imageSelector = ".Image";
        await page.waitForSelector(imageSelector, { timeout: 1000 });

        await browser.assertView("product_details_content", ".ProductDetails", {
            ignoreElements: [
                ".ProductDetails-Name",
                ".ProductDetails-Description",
                ".ProductDetails-Price",
                ".ProductDetails-Color",
                ".ProductDetails-Material",
                ".Image",
            ],
        });
    });
    it("Тест Product details BUG_ID=9", async function ({ browser }) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();

        await browser.url("http://localhost:3000/hw/store" + BUG_ID);

        await page.goto("http://localhost:3000/hw/store/catalog" + BUG_ID);

        const searchResultSelector = ".ProductItem-DetailsLink";
        await page.waitForSelector(searchResultSelector, { timeout: 1000 });
        await page.click(searchResultSelector);

        const addToCartSelector = ".ProductDetails-AddToCart";
        await page.waitForSelector(addToCartSelector, { timeout: 1000 });

        await browser.assertView("add_to_cart", ".ProductDetails-AddToCart");
    });
});
