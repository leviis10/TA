const Employee = require("../models/Employee");
const Stock = require("../models/Stock");
const Supplier = require("../models/Supplier");
const Transaction = require("../models/Transaction");
const TransactionGroup = require("../models/TransactionGroup");
const addSellerToTransactionGroup = require("../utils/addSellerToTransactionGroup");
const catchAsync = require("../utils/catchAsync");

const createNewTransactionGroup = catchAsync(async (req, res) => {
  const transactionGroup = await TransactionGroup.create(req.body);
  res.status(201).send(transactionGroup);
});

const getAllTransactionGroups = catchAsync(async (req, res) => {
  const transactionGroups = await TransactionGroup.findAll({
    include: [
      // Include Transaction model
      {
        model: Transaction,
        include: [
          // Include Stock model
          {
            model: Stock,
            include: [
              // Include Supplier model
              { model: Supplier },
            ],
          },
        ],
      },

      // Include Employee model
      { model: Employee },
    ],
    order: [["createdAt", "DESC"]],
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

const getTransactionGroupDetail = catchAsync(async (req, res) => {
  const { id } = req.params;
  const transactionGroup = await TransactionGroup.findByPk(id, {
    include: [{ model: Transaction, include: Stock }, Employee],
  });
  const transactionGroupWithSellerObj = await addSellerToTransactionGroup(
    transactionGroup
  );
  res.send(transactionGroupWithSellerObj || transactionGroup);
});

const deleteTransactionGroup = catchAsync(async (req, res) => {
  const { id } = req.params;
  await TransactionGroup.destroy({ where: { id } });
  res.send({ message: "Transaction group successfully deleted" });
});

module.exports = {
  createNewTransactionGroup,
  getAllTransactionGroups,
  getTransactionGroupDetail,
  deleteTransactionGroup,
};
