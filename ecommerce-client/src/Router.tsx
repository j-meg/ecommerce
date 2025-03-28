import { createBrowserRouter } from "react-router";
import { Admin } from "./pages/Admin";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Home } from "./pages/Home";
import { Layout } from "./pages/Layout";
import { NotFound } from "./pages/NotFound";
import { Products } from "./pages/ShowProducts";
import { ShowProduct } from "./pages/ShowProduct";
import { OrderConfirmation } from "./pages/OrderConfirmation";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/products",
                element: <Products />,
            },
            {
                path: "/product/:id",
                element: <ShowProduct />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/checkout",
                element: <Checkout />,
            },
            {
                path: "/admin",
                element: <Admin />,
            },
            {
                path: "/order-confirmation",
                element: <OrderConfirmation />,
            }
        ]
    }
]);