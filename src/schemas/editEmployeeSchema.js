const { checkSchema } = require("express-validator");

const editEmployeeSchema = checkSchema({
  username: {
    trim: true,
    notEmpty: true,
    errorMessage: "Username can't be empty",
  },
  email: {
    notEmpty: true,
    isEmail: true,
    normalizeEmail: true,
    errorMessage: "Invalid email address",
  },
  phoneNumber: {
    isMobilePhone: true,
    notEmpty: true,
    errorMessage: "Invalid phone number",
  },
  address: {
    notEmpty: true,
    errorMessage: "Address can't be empty",
  },
});

module.exports = editEmployeeSchema;
