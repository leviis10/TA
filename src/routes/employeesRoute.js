const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdmin = require("../middlewares/isAdmin");
const validateSchema = require("../middlewares/validateSchema");
const addEmployeeSchema = require("../schemas/employeeSchemas/addEmployeeSchema");
const editEmployeeSchema = require("../schemas/employeeSchemas/editEmployeeSchema");
const {
  getAllEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee,
  getEmployeeTransactionGroups,
} = require("../controllers/employeesController");

const router = express.Router();

router
  .route("/")
  .get(isLoggedIn, isAdmin, getAllEmployees)
  .post(isLoggedIn, isAdmin, validateSchema(addEmployeeSchema), createEmployee);

router
  .route("/:id")
  .get(isLoggedIn, isAdmin, getEmployee)
  .put(isLoggedIn, isAdmin, validateSchema(editEmployeeSchema), updateEmployee)
  .delete(isLoggedIn, isAdmin, deleteEmployee);

router
  .route("/:id/transaction-groups")
  .get(isLoggedIn, isAdmin, getEmployeeTransactionGroups);

module.exports = router;
