import React from "react";
import { render, screen } from "@testing-library/react";
import events from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { initStore } from "../../src/client/store";
import { CartApi, ExampleApi } from "../../src/client/api";
import { Cart } from "../../src/client/pages/Cart";
import "@testing-library/jest-dom";
import { Application } from "../../src/client/Application";

describe("Cart test", () => {
    it("в корзине должна быть кнопка `очистить корзину`, по нажатию на которую все товары должны удаляться", async () => {
        const cartMock = {
            0: {
                count: 1,
                name: "Incredible Sausages",
                price: 804,
            },
            1: {
                count: 2,
                name: "Rustic Keyboard",
                price: 352,
            },
        };
        const basename = "/hw/store";
        const apiMock = new ExampleApi(basename);
        const cart = new CartApi();
        cart.getState = () => {
            return cartMock;
        };

        const store = initStore(apiMock, cart);
        const application = (
            <BrowserRouter>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </BrowserRouter>
        );

        render(application);

        const buttonClearElement = screen.getByRole("button", {
            name: /clear shopping cart/i,
        });

        cart.getState = () => {
            return {};
        };

        await events.click(buttonClearElement);

        const cartElement = screen.getByText(
            /Cart is empty. Please select products in the /i
        );

        expect(cartElement).toBeInTheDocument();
    });
    it("если корзина пустая, должна отображаться ссылка на каталог товаров", async () => {
        const cartMock = {
            0: {
                count: 1,
                name: "Incredible Sausages",
                price: 804,
            },
            1: {
                count: 2,
                name: "Rustic Keyboard",
                price: 352,
            },
        };
        const basename = "/hw/store";
        const apiMock = new ExampleApi(basename);
        const cart = new CartApi();
        cart.getState = () => {
            return cartMock;
        };

        const store = initStore(apiMock, cart);
        const application = (
            <BrowserRouter>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </BrowserRouter>
        );

        render(application);

        const buttonClearElement = screen.getByRole("button", {
            name: /clear shopping cart/i,
        });

        cart.getState = () => {
            return {};
        };

        await events.click(buttonClearElement);

        const catalogElement = screen.getByRole("link", {
            name: /catalog/i,
        });

        expect(catalogElement).toBeInTheDocument();
    });
    it("в шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней", async () => {
        const cartMock = {
            0: {
                count: 1,
                name: "Incredible Sausages",
                price: 804,
            },
            1: {
                count: 2,
                name: "Rustic Keyboard",
                price: 352,
            },
        };
        const basename = "/hw/store";
        const apiMock = new ExampleApi(basename);
        const cart = new CartApi();
        cart.getState = () => {
            return cartMock;
        };

        const store = initStore(apiMock, cart);
        const application = (
            <BrowserRouter>
                <Provider store={store}>
                    <Application />
                </Provider>
            </BrowserRouter>
        );

        render(application);

        const cartElement = screen.getByRole("link", {
            name: /cart \(2\)/i,
        });

        expect(cartElement).toBeInTheDocument();
    });
    it("содержимое корзины должно сохраняться между перезагрузками страницы", async () => {
        const cartMock = {
            0: {
                count: 1,
                name: "Incredible Sausages",
                price: 804,
            },
            1: {
                count: 2,
                name: "Rustic Keyboard",
                price: 352,
            },
        };
        const basename = "/hw/store";
        const apiMock = new ExampleApi(basename);
        const cart = new CartApi();
        cart.getState = () => {
            return cartMock;
        };

        const store = initStore(apiMock, cart);
        const application = (
            <BrowserRouter>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </BrowserRouter>
        );

        render(application);

        const cartBeforeElement = screen.getByRole("table");

        expect(cartBeforeElement).toBeInTheDocument();

        window.location.reload;

        const cartAfterElement = screen.getByRole("table");

        expect(cartAfterElement).toBeInTheDocument();
    });
});
