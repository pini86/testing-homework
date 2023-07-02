const { assert } = require("chai");

let BUG_ID = "";
// Для тестирования с багом можно разкомментировать строку ниже
//BUG_ID = "/?bug_id=7";

describe("Cart test", async function () {
    it("Тест Cart BUG_ID=7 , 8 , 10", async function ({ browser }) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();

        await browser.url("http://localhost:3000/hw/store" + BUG_ID);

        await page.goto("http://localhost:3000/hw/store/catalog" + BUG_ID);

        const searchResultSelector = ".ProductItem-DetailsLink";
        await page.waitForSelector(searchResultSelector, { timeout: 1000 });
        await page.click(searchResultSelector);

        const addToCartSelector = ".ProductDetails-AddToCart";
        await page.waitForSelector(addToCartSelector, { timeout: 1000 });
        await page.click(addToCartSelector);

        await page.waitForSelector(".text-success", { timeout: 1000 });

        await page.goto(" http://localhost:3000/hw/store/cart" + BUG_ID);

        const nameSelector = ".Form-Field_type_name";
        await page.waitForSelector(nameSelector, {
            timeout: 1000,
        });

        await page.click(nameSelector);
        await page.keyboard.type("name");

        const phoneSelector = ".Form-Field_type_phone";
        await page.waitForSelector(phoneSelector, { timeout: 1000 });
        await page.click(phoneSelector);
        await page.keyboard.type("1234567890");

        const addressSelector = ".Form-Field_type_address";
        await page.waitForSelector(addressSelector, { timeout: 1000 });
        await page.click(addressSelector);
        await page.keyboard.type("address");

        const submitSelector = ".Form-Submit";
        await page.waitForSelector(submitSelector, { timeout: 1000 });
        await page.click(submitSelector);

        const succesSelector = ".Cart-SuccessMessage";
        await page.waitForSelector(succesSelector, { timeout: 1000 });

        await browser.assertView(
            "correct_cart_well_done",
            ".Cart-SuccessMessage",
            {
                ignoreElements: [".Cart-Number"],
            }
        );
    });
});
