import React from "react";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import ProductsPage from "../pages/ProductsPage";
import ContactPage from "../pages/ContactPage";
import MarketDirectory from "../pages/MarketDirectory";
import FindMarket from "../pages/FindMarket";
import LoginPage from "../components/LoginPage";
import SignUpPage from "../components/SignUpPage";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/markets",
    element: <MarketDirectory />,
  },
  {
    path: "/find-market",
    element: <FindMarket />,
  },
  {
    path: "/products",
    element: <ProductsPage />,
  },
  {
    path: "/produce",
    element: <ProductsPage />,
  },
  {
    path: "/about",
    element: <AboutUs />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  
  {
    path: "/login",
    element: <LoginPage />,
  },
  
  {
    path: "/signup",
    element: <SignUpPage />,
  },
];