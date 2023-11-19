const ExpressError = require("../utils/ExpressError");

function isAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    throw new ExpressError("You don't have permission to do that", 403);
  }

  next();
}

module.exports = isAdmin;
