require("dotenv").config();
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const sequelize = require("./db");
const Supplier = require("./models/Supplier");
const Stock = require("./models/Stock");
const Transaction = require("./models/Transaction");
const TransactionGroup = require("./models/TransactionGroup");
const Employee = require("./models/Employee");
const authRoute = require("./routes/authRoute");
const employeesRoute = require("./routes/employeesRoute");
const suppliersRoute = require("./routes/suppliersRoute");
const transactionsRoute = require("./routes/transactionsRoute");
const stocksRoute = require("./routes/stocksRoute");
const transactionGroupRoute = require("./routes/transactionGroupsRoute");
const ExpressError = require("./utils/ExpressError");

const app = express();

// Database connection
(async function () {
  try {
    // Check database connection
    sequelize.authenticate();
    console.log("Connected to the database");

    // Association definition
    // Supplier --> Stock (1 : M)
    Supplier.hasMany(Stock, { foreignKey: "supplier" });
    Stock.belongsTo(Supplier, { foreignKey: "supplier" });

    // Stock --> Transaction (1 : M)
    Stock.hasMany(Transaction, { foreignKey: "stockId", onDelete: "SET NULL" });
    Transaction.belongsTo(Stock, { foreignKey: "stockId" });

    // Employee --> TransactionGroup (1 : M)
    Employee.hasMany(TransactionGroup, {
      foreignKey: "buyer",
      onDelete: "SET NULL",
    });
    TransactionGroup.belongsTo(Employee, { foreignKey: "buyer" });

    // TransactionGroup --> Transaction (1 : M)
    TransactionGroup.hasMany(Transaction, {
      foreignKey: "transactionGroupId",
      onDelete: "CASCADE",
    });
    Transaction.belongsTo(TransactionGroup, {
      foreignKey: "transactionGroupId",
    });

    // Synchronize database
    await sequelize.sync();
    console.log("Table synchronized");
  } catch (err) {
    console.error(err.message);
  }
})();

// Middleware
app.use(express.json());
app.use(cookieParser());

// App Route
app.use("/api/auth", authRoute);
app.use("/api/employees", employeesRoute);
app.use("/api/suppliers", suppliersRoute);
app.use("/api/stocks", stocksRoute);
app.use("/api/transactions", transactionsRoute);
app.use("/api/transaction-groups", transactionGroupRoute);

// Serve static asset in production
if (process.env.NODE_ENV === "production") {
  const clientDir = path.join(__dirname, "..", "client", "dist");
  app.use(express.static(clientDir));
  app.get("*", (req, res) => {
    res.sendFile(clientDir);
  });
}

// Error handler
app.all("*", (req, res) => {
  throw new ExpressError("Resource not found", 404);
});

app.use((err, req, res, next) => {
  const { message = "Something went wrong", statusCode = 500 } = err;
  res.status(statusCode).send({ message, statusCode });
});

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
