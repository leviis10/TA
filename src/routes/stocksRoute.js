const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const Stock = require("../models/Stock");
const Supplier = require("../models/Supplier");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const isAdmin = require("../middlewares/isAdmin");
const validateSchema = require("../middlewares/validateSchema");
const editStockSchema = require("../schemas/editStockSchema");
const addStockSchema = require("../schemas/addStockSchema");
const { Op } = require("sequelize");
const Transaction = require("../models/Transaction");
const TransactionGroup = require("../models/TransactionGroup");
const Employee = require("../models/Employee");

const router = express.Router();

router.get(
  "/",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { query } = req.query;
    let stocks;
    if (!query) {
      stocks = await Stock.findAll({
        include: Supplier,
        order: [["name", "ASC"]],
      });
    }
    if (query) {
      stocks = await Stock.findAll({
        include: Supplier,
        where: {
          name: {
            [Op.iLike]: `%${query}%`,
          },
        },
        order: [["name", "ASC"]],
      });
    }

    // Send response
    res.send(stocks);
  })
);

router.get(
  "/:id",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;

    // Find stock in the database
    const stock = await Stock.findByPk(id, {
      include: [
        Supplier,
        {
          model: Transaction,
          include: { model: TransactionGroup, include: Employee },
        },
      ],
    });

    // Throw error if there is no stock
    if (!stock) {
      throw new ExpressError("Stock not found", 404);
    }

    // add seller key to the stock.Transactions
    const modifiedTransactions = [];
    for (const transaction of stock.Transactions) {
      // Create transactionObj
      const transactionObj = transaction.toJSON();

      if (transaction.TransactionGroup.type === "purchase") {
        transactionObj.seller = stock.Supplier.name;
        modifiedTransactions.push(transactionObj);
        continue;
      }

      // Find seller
      const seller = await Employee.findByPk(
        transaction.TransactionGroup.seller
      );

      // Add seller key in the transactionObj
      transactionObj.seller = seller?.username || "Deleted Employee";

      // Push transactionObj to the array
      modifiedTransactions.push(transactionObj);
    }

    // Create object from stock
    const stockObj = stock.toJSON();
    stockObj.Transactions = modifiedTransactions;

    // Send stock as a response
    res.send(stockObj);
  })
);

router.patch(
  "/:id",
  isLoggedIn,
  isAdmin,
  validateSchema(editStockSchema),
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Stock.update(req.body, { where: { id } });
    res.send({ message: "Stock updated successfully" });
  })
);

router.post(
  "/",
  isLoggedIn,
  isAdmin,
  validateSchema(addStockSchema),
  catchAsync(async (req, res) => {
    const newStock = await Stock.create(req.body);
    res.status(201).send(newStock);
  })
);

router.delete(
  "/:id",
  isLoggedIn,
  isAdmin,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Stock.destroy({ where: { id } });
    res.send({ message: "Successfully deleted stock" });
  })
);

module.exports = router;
