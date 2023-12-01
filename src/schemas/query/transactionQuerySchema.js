const { checkSchema } = require("express-validator");

const transactionQuerySchema = checkSchema(
  {
    type: {
      isIn: { options: [["sell", "purchase"]] },
      errorMessage: "type query must be either sell or purchase",
    },
  },
  ["query"]
);

module.exports = transactionQuerySchema;
