const { checkSchema } = require("express-validator");

const loginSchema = checkSchema({
  username: {
    notEmpty: true,
    errorMessage: "Invalid username",
  },
  password: {
    notEmpty: true,
    errorMessage: "Invalid password",
  },
});

module.exports = loginSchema;
