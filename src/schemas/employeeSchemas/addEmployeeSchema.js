const { checkSchema } = require("express-validator");

const addEmployeeSchema = checkSchema(
  {
    username: {
      notEmpty: true,
      trim: true,
      errorMessage: "Username can't be empty",
    },
    password: {
      notEmpty: true,
      errorMessage: "Password can't be empty",
    },
    email: {
      notEmpty: true,
      isEmail: true,
      normalizeEmail: true,
      errorMessage: "Invalid email address",
    },
    phoneNumber: {
      notEmpty: true,
      isMobilePhone: true,
      errorMessage: "Invalid Phone Number",
    },
    address: {
      notEmpty: true,
      trim: true,
      errorMessage: "Invalid address",
    },
  },
  ["body"]
);

module.exports = addEmployeeSchema;
