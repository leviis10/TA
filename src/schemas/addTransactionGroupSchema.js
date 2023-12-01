const { checkSchema } = require("express-validator");

const addTransactionGroup = checkSchema(
  {
    type: {
      isIn: { options: [["sell", "purchase"]] },
      errorMessage: "type must be either sell or purchase",
      notEmpty: true,
    },
  },
  ["body"]
);

module.exports = addTransactionGroup;
