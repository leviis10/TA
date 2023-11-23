const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdmin = require("../middlewares/isAdmin");
const validateSchema = require("../middlewares/validateSchema");
const addEmployeeSchema = require("../schemas/addEmployeeSchema");
const editEmployeeSchema = require("../schemas/editEmployeeSchema");
const {
  getAllEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee,
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

module.exports = router;
