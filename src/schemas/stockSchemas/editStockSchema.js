const { checkSchema } = require("express-validator");

const editStockSchema = checkSchema(
  {
    quantity: {
      toInt: true,
      isInt: {
        options: {
          min: 0,
        },
      },
      notEmpty: true,
      errorMessage:
        "Quantity must be an integer number and greater than or equal to 0",
    },
    price: {
      toInt: true,
      isInt: {
        options: {
          min: 0,
        },
      },
      notEmpty: true,
      errorMessage:
        "Price must be an integer number and greater than or equal to 0",
    },
  },
  ["body"]
);

module.exports = editStockSchema;
