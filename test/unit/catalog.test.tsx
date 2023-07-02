import React from "react";
import { render, screen } from "@testing-library/react";
import events from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { initStore } from "../../src/client/store";
import { Application } from "../../src/client/Application";
import { CartApi, ExampleApi } from "../../src/client/api";
import { ProductShortInfo } from "../../src/common/types";
import "@testing-library/jest-dom";

describe("Catalog test", () => {
    it("в каталоге должны отображаться товары, список которых приходит с сервера", async () => {
        const cartMock = {};
        const basename = "/hw/store";
        const apiMock = new ExampleApi(basename);
        const cart = new CartApi();
        cart.getState = () => {
            return cartMock;
        };

        const mockProduct = {
            id: 1,
            name: "test Item",
            price: 777,
        } as ProductShortInfo;

        apiMock.getProducts = jest
            .fn()
            .mockResolvedValue({ data: [mockProduct] });

        const store = initStore(apiMock, cart);
        const application = (
            <BrowserRouter>
                <Provider store={store}>
                    <Application />
                </Provider>
            </BrowserRouter>
        );

        render(application);

        const catalogElement = screen.getByRole("link", {
            name: /catalog/i,
        });

        await events.click(catalogElement);

        const nameElement = screen.getByRole("heading", {
            name: /test Item/i,
        });

        expect(nameElement).toBeVisible();

        const priceElement = screen.getByText(/\$777/i);

        expect(priceElement).toBeVisible();
    });
});
