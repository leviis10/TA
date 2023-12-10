const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const validateSchema = require("../middlewares/validateSchema");
const addTransactionGroupSchema = require("../schemas/transactionGroupSchemas/addTransactionGroupSchema");
const isAdmin = require("../middlewares/isAdmin");
const {
  createNewTransactionGroup,
  getAllTransactionGroups,
  getTransactionGroupDetail,
  deleteTransactionGroup,
} = require("../controllers/transactionGroupsController");

const router = express.Router();

router
  .route("/")
  .post(
    isLoggedIn,
    validateSchema(addTransactionGroupSchema),
    createNewTransactionGroup
  )
  .get(isLoggedIn, getAllTransactionGroups);

router
  .route("/:id")
  .get(isLoggedIn, getTransactionGroupDetail)
  .delete(isLoggedIn, isAdmin, deleteTransactionGroup);

module.exports = router;
