const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdmin = require("../middlewares/isAdmin");
const validateSchema = require("../middlewares/validateSchema");
const addEmployeeSchema = require("../schemas/addEmployeeSchema");
const editEmployeeSchema = require("../schemas/editEmployeeSchema");
const {
  getAllEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee,
} = require("../controllers/employeesController");
const TransactionGroup = require("../models/TransactionGroup");
const { Op } = require("sequelize");
const Transaction = require("../models/Transaction");

const router = express.Router();

router
  .route("/")
  .get(isLoggedIn, isAdmin, getAllEmployees)
  .post(isLoggedIn, isAdmin, validateSchema(addEmployeeSchema), createEmployee);

router
  .route("/:id")
  .get(isLoggedIn, isAdmin, getEmployee)
  .put(isLoggedIn, isAdmin, validateSchema(editEmployeeSchema), updateEmployee)
  .delete(isLoggedIn, isAdmin, deleteEmployee);

router.get("/:id/transaction-groups", async (req, res) => {
  const { id } = req.params;

  const transactionGroups = await TransactionGroup.findAll({
    attributes: ["id", "type", "createdAt"],
    where: {
      [Op.or]: [{ buyer: id }, { seller: id }],
    },
    include: [
      {
        model: Transaction,
        attributes: ["price", "quantity"],
      },
    ],
  });

  // Add totalPrice key to the transaction groups
  const transactionGroupsWithTotalPriceKey = [];
  for (const transactionGroup of transactionGroups) {
    // create transaction group object
    const transactionGroupObj = transactionGroup.toJSON();
    transactionGroupObj.totalPrice = transactionGroupObj.Transactions.reduce(
      (acc, transaction) => acc + transaction.quantity * transaction.price,
      0
    );
    transactionGroupsWithTotalPriceKey.push(transactionGroupObj);
  }

  res.send(transactionGroupsWithTotalPriceKey);
});

module.exports = router;
