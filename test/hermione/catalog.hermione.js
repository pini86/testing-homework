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
    it("Тест если товар уже добавлен в корзину, повторное нажатие кнопки `добавить в корзину` должно увеличивать его количество", async function ({
        browser,
    }) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();

        await browser.url("http://localhost:3000/hw/store");

        await page.goto("http://localhost:3000/hw/store/catalog");

        const searchResultSelector = ".ProductItem-DetailsLink";
        await page.waitForSelector(searchResultSelector, { timeout: 1000 });
        await page.click(searchResultSelector);

        const addToCartSelector = ".ProductDetails-AddToCart";
        await page.waitForSelector(addToCartSelector, { timeout: 1000 });
        await page.click(addToCartSelector);

        await page.waitForSelector(".text-success", { timeout: 1000 });
        await page.click(addToCartSelector);

        await page.goto(" http://localhost:3000/hw/store/cart");

        await browser.assertView(
            "correct_count_add_to_cart_well_done",
            ".Cart-Count"
        );
    });
    it("Тест если товар уже добавлен в корзину, в каталоге и на странице товара должно отображаться сообщение об этом", async function ({
        browser,
    }) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();

        await browser.url("http://localhost:3000/hw/store");

        await page.goto("http://localhost:3000/hw/store/catalog");

        const searchResultSelector = ".ProductItem-DetailsLink";
        await page.waitForSelector(searchResultSelector, { timeout: 1000 });
        await page.click(searchResultSelector);

        const addToCartSelector = ".ProductDetails-AddToCart";
        await page.waitForSelector(addToCartSelector, { timeout: 1000 });
        await page.click(addToCartSelector);

        await page.waitForSelector(".text-success", { timeout: 1000 });
       

        await page.goto("http://localhost:3000/hw/store/catalog");

        await browser.assertView(
            "correct_message_add_to_cart_well_done",
            ".CartBadge"
        );
    });
});
