const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdmin = require("../middlewares/isAdmin");
const Supplier = require("../models/Supplier");
const catchAsync = require("../utils/catchAsync");
const validateSchema = require("../middlewares/validateSchema");
const supplierSchema = require("../schemas/supplierSchema");
const Stock = require("../models/Stock");
const TransactionGroup = require("../models/TransactionGroup");
const Transaction = require("../models/Transaction");
const sequelize = require("sequelize");
const Employee = require("../models/Employee");

const router = express.Router();

router.get(
  "/",
  isLoggedIn,
  isAdmin,
  catchAsync(async (req, res) => {
    const suppliers = await Supplier.findAll({ order: [["name", "ASC"]] });
    res.send(suppliers);
  })
);

router.get(
  "/:id",
  isLoggedIn,
  isAdmin,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const supplier = await Supplier.findByPk(id, {
      include: [{ model: Stock }],
    });
    res.send(supplier);
  })
);

router.get(
  "/:id/transaction-groups",
  isLoggedIn,
  isAdmin,
  catchAsync(async (req, res) => {
    const { id } = req.params;

    // Query transactionGroups
    const transactionGroups = await TransactionGroup.findAll({
      attributes: ["id", "createdAt"],
      include: [
        {
          model: Transaction,
          attributes: ["quantity", "price"],
          include: [
            {
              model: Stock,
              where: { supplier: id },
            },
          ],
        },
        {
          model: Employee,
          attributes: ["username"],
        },
      ],
      where: {
        type: "purchase",
      },
      order: [["createdAt", "DESC"]],
      limit: 5,
    });

    // Manipulate transaction group
    const modifiedTransactionGroups = [];
    for (const transactionGroup of transactionGroups) {
      // Continue if there is no transactions
      if (transactionGroup.Transactions.length === 0) {
        continue;
      }

      // create transactionGroupObj
      const transactionGroupObj = transactionGroup.toJSON();
      transactionGroupObj.price = transactionGroupObj.Transactions.reduce(
        (acc, transaction) => acc + transaction.quantity * transaction.price,
        0
      );
      modifiedTransactionGroups.push(transactionGroupObj);
    }

    // Send response
    res.send(modifiedTransactionGroups);
  })
);

router.post(
  "/",
  isLoggedIn,
  isAdmin,
  validateSchema(supplierSchema),
  async (req, res) => {
    const supplier = await Supplier.create(req.body);
    res.status(201).send(supplier);
  }
);

router.put(
  "/:id",
  isLoggedIn,
  isAdmin,
  validateSchema(supplierSchema),
  async (req, res) => {
    const { id } = req.params;
    await Supplier.update(req.body, { where: { id } });
    res.send({ message: "Successfully updated supplier" });
  }
);

router.delete("/:id", isLoggedIn, isAdmin, async (req, res) => {
  const { id } = req.params;
  await Supplier.destroy({ where: { id } });
  res.send({ message: "Successfully deleted supplier" });
});

module.exports = router;
