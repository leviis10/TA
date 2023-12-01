const { checkSchema } = require("express-validator");

const loginSchema = checkSchema(
  {
    username: {
      notEmpty: true,
      errorMessage: "Invalid username",
      trim: true,
    },
    password: {
      notEmpty: true,
      errorMessage: "Invalid password",
    },
  },
  ["body"]
);

module.exports = loginSchema;
