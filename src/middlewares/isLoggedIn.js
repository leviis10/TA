const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");
const ExpressError = require("../utils/ExpressError");

async function isLoggedIn(req, res, next) {
  const token = req.cookies.authToken;
  if (!token) {
    return next(new ExpressError("You are not logged in", 401));
  }

  const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

  const user = await Employee.findByPk(verifiedToken.id, {
    attributes: { exclude: ["password"] },
  });
  if (!user) {
    res.clearCookie("authToken");
    return next(new ExpressError("You are not logged in", 401));
  }

  req.user = user.toJSON();
  next();
}

module.exports = isLoggedIn;
