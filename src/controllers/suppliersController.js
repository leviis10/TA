const Employee = require("../models/Employee");
const Stock = require("../models/Stock");
const Supplier = require("../models/Supplier");
const Transaction = require("../models/Transaction");
const TransactionGroup = require("../models/TransactionGroup");
const catchAsync = require("../utils/catchAsync");

const getAllSuppliers = catchAsync(async (req, res) => {
  const suppliers = await Supplier.findAll({ order: [["name", "ASC"]] });
  res.send(suppliers);
});

const getSupplierDetail = catchAsync(async (req, res) => {
  const { id } = req.params;
  const supplier = await Supplier.findByPk(id, {
    include: [{ model: Stock }],
  });
  res.send(supplier);
});

const getSupplierTransaction = catchAsync(async (req, res) => {
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
});

const createNewSupplier = catchAsync(async (req, res) => {
  const supplier = await Supplier.create(req.body);
  res.status(201).send(supplier);
});

const updateSupplier = catchAsync(async (req, res) => {
  const { id } = req.params;
  await Supplier.update(req.body, { where: { id } });
  res.send({ message: "Successfully updated supplier" });
});

const deleteSupplier = catchAsync(async (req, res) => {
  const { id } = req.params;
  await Supplier.destroy({ where: { id } });
  res.send({ message: "Successfully deleted supplier" });
});

module.exports = {
  getAllSuppliers,
  getSupplierDetail,
  getSupplierTransaction,
  createNewSupplier,
  updateSupplier,
  deleteSupplier,
};
