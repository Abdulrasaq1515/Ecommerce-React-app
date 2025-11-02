import React from "react";
import { createBrowserRouter } from "react-router";
import ProductDetails from "../pages/ProductDetails";
import CartPage from "../pages/CartPage";
import CategoryPage from "../pages/CategoryPage";
import LandingPage from "../pages/LandingPage";
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
