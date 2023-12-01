const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const Transaction = require("../models/Transaction");
const catchAsync = require("../utils/catchAsync");
const validateSchema = require("../middlewares/validateSchema");
const addTransactionSchema = require("../schemas/addTransactionSchema");
const Stock = require("../models/Stock");
const transactionQuerySchema = require("../schemas/query/transactionQuerySchema");

const router = express.Router();

router.post(
  "/",
  isLoggedIn,
  validateSchema(addTransactionSchema),
  validateSchema(transactionQuerySchema),
  catchAsync(async (req, res) => {
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
  })
);

module.exports = router;
