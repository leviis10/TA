const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdmin = require("../middlewares/isAdmin");
const Employee = require("../models/Employee");
const ExpressError = require("../utils/ExpressError");
const catchAsync = require("../utils/catchAsync");

const router = express.Router();

router.get(
  "/",
  isLoggedIn,
  isAdmin,
  catchAsync(async (req, res) => {
    const employees = await Employee.findAll({
      attributes: { exclude: ["password"] },
    });
    res.send(employees);
  })
);

router.get(
  "/:id",
  isLoggedIn,
  isAdmin,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const employee = await Employee.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (!employee) {
      throw new ExpressError("No employee found", 404);
    }
    res.send(employee);
  })
);

module.exports = router;
