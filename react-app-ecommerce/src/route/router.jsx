import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ProductDetails from "../pages/productDetails/ProductDetails";
import CartPage from "../pages/cart/CartPage.jsx";
import CategoryPage from "../pages/CategoryPage";
import LandingPage from "../pages/landingPage/LandingPage";
import Login from "../auth/Login";
import AllProducts from "../components/AllProducts.jsx";

const router = createBrowserRouter([
    {
        path: "/landingpage",
        element: <LandingPage />
    },
    {
        path: "/productsDetails",
        element: <ProductDetails />
    },
    {
        path: "/products",
        element : <AllProducts />
    },
    {
        path: "/product/:id",
        element: <ProductDetails />
    },
    {
        path: "/cart",
        element: <CartPage />
    },
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/categories",
        element: <CategoryPage />
    }
]);
export default router;
