if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");

const cookieParser = require("cookie-parser");
const sequelize = require("./db");
const Employee = require("./models/Employee");
const authRoute = require("./routes/authRoute");
const employeesRoute = require("./routes/employeesRoute");
const suppliersRoute = require("./routes/suppliersRoute");
const stocksRoute = require("./routes/stocksRoute");
const ExpressError = require("./utils/ExpressError");
const Supplier = require("./models/Supplier");
const Stock = require("./models/Stock");

const app = express();

// Database connection
(async function () {
  try {
    // Check database connection
    sequelize.authenticate();
    console.log("Connected to the database");

    // Association definition
    Supplier.hasMany(Stock, { foreignKey: "supplier" });
    Stock.belongsTo(Supplier, { foreignKey: "supplier" });

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
