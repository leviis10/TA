const { checkSchema } = require("express-validator");

const addTransactionSchema = checkSchema({
  stockId: {
    isUUID: true,
    notEmpty: true,
    errorMessage: "Invalid stock id",
  },
  transactionGroupId: {
    isUUID: true,
    notEmpty: true,
    errorMessage: "Invalid transaction group id",
  },
  quantity: {
    toInt: true,
    isInt: { options: { min: 1 } },
    errorMessage: "Quantity must be greater or equal to 1",
    notEmpty: true,
  },
  price: {
    toInt: true,
    isInt: { options: { min: 0 } },
    errorMessage: "Price must be greater than or equal to 0",
    notEmpty: true,
  },
  note: {
    trim: true,
  },
});

module.exports = addTransactionSchema;
