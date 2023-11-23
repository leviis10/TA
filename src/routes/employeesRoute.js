const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdmin = require("../middlewares/isAdmin");
const Employee = require("../models/Employee");
const ExpressError = require("../utils/ExpressError");
const catchAsync = require("../utils/catchAsync");
const validateSchema = require("../middlewares/validateSchema");
const addEmployeeSchema = require("../schemas/addEmployeeSchema");
const editEmployeeSchema = require("../schemas/editEmployeeSchema");

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

router.post(
  "/",
  isLoggedIn,
  isAdmin,
  validateSchema(addEmployeeSchema),
  catchAsync(async (req, res) => {
    await Employee.create({ ...req.body, role: "employee" });
    res.status(201).send({ message: "Employee created successfully" });
  })
);

router.delete(
  "/:id",
  isLoggedIn,
  isAdmin,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Employee.destroy({ where: { id } });
    res.send({ message: "Successfully deleted a user" });
  })
);

router.put(
  "/:id",
  isLoggedIn,
  isAdmin,
  validateSchema(editEmployeeSchema),
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Employee.update(req.body, { where: { id } });
    res.send({ message: "Successfully updated a user" });
  })
);

module.exports = router;
