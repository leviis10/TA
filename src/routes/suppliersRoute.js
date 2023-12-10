const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdmin = require("../middlewares/isAdmin");
const validateSchema = require("../middlewares/validateSchema");
const supplierSchema = require("../schemas/supplierSchemas/supplierSchema");
const {
  getAllSuppliers,
  getSupplierDetail,
  getSupplierTransaction,
  createNewSupplier,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/suppliersController");

const router = express.Router();

router
  .route("/")
  .get(isLoggedIn, isAdmin, getAllSuppliers)
  .post(isLoggedIn, isAdmin, validateSchema(supplierSchema), createNewSupplier);

router
  .route("/:id")
  .get(isLoggedIn, isAdmin, getSupplierDetail)
  .put(isLoggedIn, isAdmin, validateSchema(supplierSchema), updateSupplier)
  .delete(isLoggedIn, isAdmin, deleteSupplier);

router
  .route("/:id/transaction-groups")
  .get(isLoggedIn, isAdmin, getSupplierTransaction);

module.exports = router;
