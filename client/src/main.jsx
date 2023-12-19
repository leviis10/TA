import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import AddEmployeePage from "./routes/employees/AddEmployeePage.jsx";
import EditEmployeePage from "./routes/employees/EditEmployeePage.jsx";
import EmployeeDetailPage from "./routes/employees/EmployeeDetailPage.jsx";
import EmployeesPage from "./routes/employees/EmployeesPage.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import HomePage from "./routes/HomePage.jsx";
import Root from "./routes/root.jsx";
import AddStockPage from "./routes/stocks/AddStockPage.jsx";
import EditStockPage from "./routes/stocks/EditStockPage.jsx";
import StockDetailPage from "./routes/stocks/StockDetailPage.jsx";
import StocksPage from "./routes/stocks/StocksPage.jsx";
import AddSupplierPage from "./routes/suppliers/AddSupplierPage.jsx";
import EditSupplierPage from "./routes/suppliers/EditSupplierPage.jsx";
import SupplierDetailPage from "./routes/suppliers/SupplierDetailPage.jsx";
import SuppliersPage from "./routes/suppliers/SuppliersPage.jsx";
import AddPurchaseTransactionPage from "./routes/transactions/AddPurchaseTransactionPage.jsx";
import AddSellingTransactionPage from "./routes/transactions/AddSellingTransactionPage.jsx";
import TransactionDetailPage from "./routes/transactions/TransactionDetailPage.jsx";
import TransactionsPage from "./routes/transactions/TransactionsPage.jsx";
import { store } from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },

      //  Transactions page
      {
        path: "transactions",
        element: <TransactionsPage />,
      },
      {
        path: "transactions/:transactionGroupId",
        element: <TransactionDetailPage />,
      },
      {
        path: "transactions/add/sell",
        element: <AddSellingTransactionPage />,
      },
      {
        path: "transactions/add/purchase",
        element: <AddPurchaseTransactionPage />,
      },

      // Employees page
      {
        path: "employees",
        element: <EmployeesPage />,
      },
      {
        path: "employees/add",
        element: <AddEmployeePage />,
      },
      {
        path: "employees/:employeeId",
        element: <EmployeeDetailPage />,
      },
      {
        path: "employees/:employeeId/edit",
        element: <EditEmployeePage />,
      },

      // Suppliers page
      {
        path: "suppliers",
        element: <SuppliersPage />,
      },
      {
        path: "suppliers/add",
        element: <AddSupplierPage />,
      },
      {
        path: "suppliers/:supplierId",
        element: <SupplierDetailPage />,
      },
      {
        path: "suppliers/:supplierId/edit",
        element: <EditSupplierPage />,
      },

      // Stocks page
      {
        path: "stocks",
        element: <StocksPage />,
      },
      {
        path: "stocks/add",
        element: <AddStockPage />,
      },
      {
        path: "stocks/:stockId",
        element: <StockDetailPage />,
      },
      {
        path: "stocks/:stockId/edit",
        element: <EditStockPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
