import React from "react";
import { createBrowserRouter } from "react-router";
import ProductDetails from "../pages/ProductDetails";
import CartPage from "../pages/CartPage";
import CategoryPage from "../pages/CategoryPage";
import LandingPage from "../pages/LandingPage";
import Login from "../auth/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />
    },
    {
        path: "/products",
        element: <ProductDetails />
    },
    {
        path: "/cart",
        element: <CartPage />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/categories",
        element: <CategoryPage />
    }
]);

export default router;
