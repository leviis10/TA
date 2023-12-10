const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const validateSchema = require("../middlewares/validateSchema");
const addTransactionSchema = require("../schemas/transactionSchemas/addTransactionSchema");
const transactionQuerySchema = require("../schemas/query/transactionQuerySchema");
const {
  createNewTransaction,
} = require("../controllers/transactionsController");

const router = express.Router();

router
  .route("/")
  .post(
    isLoggedIn,
    validateSchema(addTransactionSchema),
    validateSchema(transactionQuerySchema),
    createNewTransaction
  );

module.exports = router;
