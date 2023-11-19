import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import HomePage from "./routes/HomePage.jsx";
import Root from "./routes/root.jsx";
import { store } from "./store";
import TransactionsPage from "./routes/TransactionsPage.jsx";
import EmployeesPage from "./routes/EmployeesPage.jsx";
import SuppliersPage from "./routes/SuppliersPage.jsx";
import StocksPage from "./routes/StocksPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "transactions",
        element: <TransactionsPage />,
      },
      {
        path: "employees",
        element: <EmployeesPage />,
      },
      {
        path: "suppliers",
        element: <SuppliersPage />,
      },
      {
        path: "stocks",
        element: <StocksPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);