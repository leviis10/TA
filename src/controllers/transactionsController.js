const Stock = require("../models/Stock");
const Transaction = require("../models/Transaction");
const catchAsync = require("../utils/catchAsync");

const createNewTransaction = catchAsync(async (req, res) => {
  // Create new transaction
  await Transaction.create(req.body);

  // Find transaction stock to increment/decrement quantity
  const stock = await Stock.findOne({ where: { id: req.body.stockId } });
  if (req.query.type === "sell") {
    await stock.decrement("quantity", { by: req.body.quantity });
  }
  if (req.query.type === "purchase") {
    await stock.increment("quantity", { by: req.body.quantity });
  }

  // send back response
  res.status(201).send({ message: "Transaction successfully created" });
});

module.exports = { createNewTransaction };
