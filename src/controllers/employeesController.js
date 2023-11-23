const Employee = require("../models/Employee");
const ExpressError = require("../utils/ExpressError");
const catchAsync = require("../utils/catchAsync");

const getAllEmployees = catchAsync(async (req, res) => {
  const employees = await Employee.findAll({
    attributes: { exclude: ["password"] },
  });
  res.send(employees);
});

const getEmployee = catchAsync(async (req, res) => {
  const { id } = req.params;
  const employee = await Employee.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  if (!employee) {
    throw new ExpressError("No employee found", 404);
  }
  res.send(employee);
});

const createEmployee = catchAsync(async (req, res) => {
  await Employee.create({ ...req.body, role: "employee" });
  res.status(201).send({ message: "Employee created successfully" });
});

const deleteEmployee = catchAsync(async (req, res) => {
  const { id } = req.params;
  await Employee.destroy({ where: { id } });
  res.send({ message: "Successfully deleted a user" });
});

const updateEmployee = catchAsync(async (req, res) => {
  const { id } = req.params;
  await Employee.update(req.body, { where: { id } });
  res.send({ message: "Successfully updated a user" });
});

module.exports = {
  getAllEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee,
};
