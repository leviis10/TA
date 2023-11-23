import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import HomePage from "./routes/HomePage.jsx";
import Root from "./routes/root.jsx";
import { store } from "./store";
import TransactionsPage from "./routes/TransactionsPage.jsx";
import EmployeesPage from "./routes/employees/EmployeesPage.jsx";
import SuppliersPage from "./routes/suppliers/SuppliersPage.jsx";
import StocksPage from "./routes/StocksPage.jsx";
import EmployeeDetailPage from "./routes/employees/EmployeeDetailPage.jsx";
import AddEmployeePage from "./routes/employees/AddEmployeePage.jsx";
import EditEmployeePage from "./routes/employees/EditEmployeePage.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import SupplierDetailPage from "./routes/suppliers/SupplierDetailPage.jsx";
import EditSupplierPage from "./routes/suppliers/EditSupplierPage.jsx";
import AddSupplierPage from "./routes/suppliers/AddSupplierPage.jsx";

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
      {
        path: "stocks",
        element: <StocksPage />,
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
