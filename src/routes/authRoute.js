const express = require("express");
const validateSchema = require("../middlewares/validateSchema");
const loginSchema = require("../schemas/authSchemas/loginSchema");
const isLoggedIn = require("../middlewares/isLoggedIn");
const {
  loginEmployee,
  getEmployeeToken,
  logoutEmployee,
} = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .post(validateSchema(loginSchema), loginEmployee)
  .get(isLoggedIn, getEmployeeToken)
  .delete(isLoggedIn, logoutEmployee);

module.exports = router;
