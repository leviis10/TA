const { checkSchema } = require("express-validator");

const addStockSchema = checkSchema(
  {
    name: {
      notEmpty: true,
      isString: true,
      trim: true,
      errorMessage: "Invalid Stock name",
    },
    supplier: {
      isUUID: { options: 4 },
      errorMessage: "Invalid Supplier name",
    },
    quantity: {
      toInt: true,
      isInt: { options: { min: 0 } },
      errorMessage: "Quantity must be greater than or equal to 0",
    },
    price: {
      toInt: true,
      isInt: { options: { min: 0 } },
      errorMessage: "Price must be greater than or equal to 0",
    },
  },
  ["body"]
);

module.exports = addStockSchema;
