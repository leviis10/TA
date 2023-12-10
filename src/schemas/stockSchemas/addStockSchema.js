const { checkSchema } = require("express-validator");

const addStockSchema = checkSchema(
  {
    supplier: {
      isUUID: { options: 4 },
      errorMessage: "Invalid Supplier Id",
    },
    name: {
      notEmpty: true,
      isString: true,
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
    description: {
      escape: true,
    },
  },
  ["body"]
);

module.exports = addStockSchema;
