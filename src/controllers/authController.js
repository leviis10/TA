const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");

const loginEmployee = catchAsync(async (req, res) => {
  const { username, password } = req.body;

  // Search user in the database
  const user = await Employee.findOne({ where: { username } });
  if (user === null) {
    throw new ExpressError("Invalid username or password", 401);
  }

  // Compare the user inputted password with password in the database
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new ExpressError("Invalid username or password", 401);
  }

  // Sign JWT token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  // Convert user become object
  const userObj = user.toJSON();
  delete userObj.password;

  res.cookie("authToken", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
  });
  res.send({ ...userObj, token });
});

const getEmployeeToken = (req, res) => {
  const token = req.cookies.authToken;

  if (!token) {
    throw new ExpressError("There is no auth token", 401);
  }

  res.send({ ...req.user, token });
};

const logoutEmployee = (req, res) => {
  res.clearCookie("authToken");
  res.send({ message: "authToken successfully deleted" });
};

module.exports = { loginEmployee, getEmployeeToken, logoutEmployee };
