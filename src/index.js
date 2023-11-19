if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");

const cookieParser = require("cookie-parser");
const sequelize = require("./db");
const Employee = require("./models/Employee");
const authRoute = require("./routes/authRoute");
const employeesRoute = require("./routes/employeesRoute");

const app = express();

// Database connection
(async function () {
  try {
    // Check database connection
    sequelize.authenticate();
    console.log("Connected to the database");

    // Synchronize database
    await Employee.sync();
    console.log("Employee table synchronized");
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

// Error handler
app.use((err, req, res, next) => {
  const { message = "Something went wrong", statusCode = 500 } = err;
  res.status(statusCode).send({ message, statusCode });
});

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
