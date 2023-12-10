const { checkSchema } = require("express-validator");

const supplierSchema = checkSchema(
  {
    name: {
      notEmpty: true,
      trim: true,
      errorMessage: "Supplier name can't be empty",
    },
    phoneNumber: {
      notEmpty: true,
      isMobilePhone: true,
      trim: true,
      errorMessage: "Invalid phone number",
    },
    address: {
      notEmpty: true,
      trim: true,
      errorMessage: "Supplier address can't be empty",
    },
  },
  ["body"]
);

module.exports = supplierSchema;
