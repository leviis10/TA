const bcrypt = require("bcrypt");
const Employee = require("../models/Employee");
const ExpressError = require("../utils/ExpressError");
const catchAsync = require("../utils/catchAsync");
const TransactionGroup = require("../models/TransactionGroup");
const Transaction = require("../models/Transaction");
const { Op } = require("sequelize");

const getAllEmployees = catchAsync(async (req, res) => {
  const employees = await Employee.findAll({
    attributes: { exclude: ["password"] },
    order: [["username", "ASC"]],
  });
  res.send(employees);
});

const getEmployee = catchAsync(async (req, res) => {
  const { id } = req.params;

  // Query employee
  const employee = await Employee.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  if (!employee) {
    throw new ExpressError("No employee found", 404);
  }

  // Send response to the client
  res.send(employee);
});

const createEmployee = catchAsync(async (req, res) => {
  const encryptedPassword = await bcrypt.hash(req.body.password, 12);
  const newEmployee = await Employee.create({
    ...req.body,
    role: "employee",
    password: encryptedPassword,
  });
  res.status(201).send(newEmployee);
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

const getEmployeeTransactionGroups = catchAsync(async (req, res) => {
  const { id } = req.params;

  const transactionGroups = await TransactionGroup.findAll({
    attributes: ["id", "type", "createdAt"],
    where: {
      [Op.or]: [{ buyer: id }, { seller: id }],
    },
    include: [
      {
        model: Transaction,
        attributes: ["price", "quantity"],
      },
    ],
  });

  // Add totalPrice key to the transaction groups
  const transactionGroupsWithTotalPriceKey = [];
  for (const transactionGroup of transactionGroups) {
    // create transaction group object
    const transactionGroupObj = transactionGroup.toJSON();
    transactionGroupObj.totalPrice = transactionGroupObj.Transactions.reduce(
      (acc, transaction) => acc + transaction.quantity * transaction.price,
      0
    );
    transactionGroupsWithTotalPriceKey.push(transactionGroupObj);
  }

  res.send(transactionGroupsWithTotalPriceKey);
});

module.exports = {
  getAllEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee,
  getEmployeeTransactionGroups,
};
