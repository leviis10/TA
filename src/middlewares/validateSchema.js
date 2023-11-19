const { validationResult } = require("express-validator");
const ExpressError = require("../utils/ExpressError");

function validateSchema(schema) {
  return [
    schema,
    (req, res, next) => {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        const [message] = result.array();
        return next(new ExpressError(message.msg, 400));
      }

      next();
    },
  ];
}

module.exports = validateSchema;
