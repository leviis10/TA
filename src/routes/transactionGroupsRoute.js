const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const TransactionGroup = require("../models/TransactionGroup");
const catchAsync = require("../utils/catchAsync");
const validateSchema = require("../middlewares/validateSchema");
const addTransactionGroupSchema = require("../schemas/addTransactionGroupSchema");
const Supplier = require("../models/Supplier");
const Employee = require("../models/Employee");
const Transaction = require("../models/Transaction");
const Stock = require("../models/Stock");
const isAdmin = require("../middlewares/isAdmin");

const router = express.Router();

async function addSellerToTransactionGroup(transactionGroup) {
  // Create object from transaction group
  const transactionGroupObj = transactionGroup.toJSON();

  // Search seller id in supplier table
  const supplier = await Supplier.findByPk(transactionGroupObj.seller);
  // If there is seller id in supplier table
  if (supplier) {
    const supplierObj = supplier.toJSON();
    transactionGroupObj.seller = supplierObj;
    return transactionGroupObj;
  }

  // Search seller id in employee table
  const employee = await Employee.findByPk(transactionGroupObj.seller);
  if (employee) {
    const employeeObj = employee.toJSON();
    transactionGroupObj.seller = employeeObj;
    return transactionGroupObj;
  }

  return transactionGroupObj;
}

router.post(
  "/",
  isLoggedIn,
  validateSchema(addTransactionGroupSchema),
  catchAsync(async (req, res) => {
    const transactionGroup = await TransactionGroup.create(req.body);
    res.status(201).send(transactionGroup);
  })
);

router.get("/", isLoggedIn, async (req, res) => {
  const transactionGroups = await TransactionGroup.findAll({
    include: [
      {
        model: Transaction,
        include: { model: Stock, include: Supplier },
      },
      Employee,
    ],
  });

  // Fill seller key with employee
  let modifiedTransactionGroups = [];
  for (const transactionGroup of transactionGroups) {
    // Do nothing if transactionGroup.seller is null
    if (!transactionGroup.seller) {
      modifiedTransactionGroups.push(transactionGroup.toJSON());
      continue;
    }

    const transactionGroupWithSellerObj = await addSellerToTransactionGroup(
      transactionGroup
    );
    modifiedTransactionGroups.push(transactionGroupWithSellerObj);
  }

  res.send(modifiedTransactionGroups);
});

router.get("/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const transactionGroup = await TransactionGroup.findByPk(id, {
    include: [{ model: Transaction, include: Stock }, Employee],
  });
  const transactionGroupWithSellerObj = await addSellerToTransactionGroup(
    transactionGroup
  );
  res.send(transactionGroupWithSellerObj || transactionGroup);
});

router.delete("/:id", isLoggedIn, isAdmin, async (req, res) => {
  const { id } = req.params;
  await TransactionGroup.destroy({ where: { id } });
  res.send({ message: "Transaction group successfully deleted" });
});

module.exports = router;
