import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const AddProduct = React.lazy(() => import("./views/add-product/AddProduct"));
const Products = React.lazy(() => import("./views/products"));
const Orders = React.lazy(() => import("./views/orders"));
const SetRate = React.lazy(() => import("./views/set-rate"));

const routes = [
  { path: "/dashboard", element: Dashboard, name: "Dashboard", exact: true },
  { path: "/dashboard/Product", name: "Products", element: Products, exact: true },
  { path: "/dashboard/AddProduct", name: "AddProduct", element: AddProduct, exact: true },
  { path: "/dashboard/Orders", name: "Orders", element: Orders, exact: true },
  { path: "/dashboard/SetRate", name: "SetRate", element: SetRate, exact: true },
];

export default routes;
