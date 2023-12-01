const { checkSchema } = require("express-validator");

const addEmployeeSchema = checkSchema(
  {
    username: {
      notEmpty: true,
      trim: true,
    },
    password: {
      notEmpty: true,
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
      errorMessage: "Phone number can't include word",
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
