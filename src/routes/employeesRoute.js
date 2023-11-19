const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdmin = require("../middlewares/isAdmin");
const Employee = require("../models/Employee");

const router = express.Router();

router.get("/", isLoggedIn, isAdmin, async (req, res) => {
  const employees = await Employee.findAll({
    attributes: { exclude: ["password"] },
  });
  res.send(employees);
});

module.exports = router;
