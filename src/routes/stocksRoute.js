const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdmin = require("../middlewares/isAdmin");
const validateSchema = require("../middlewares/validateSchema");
const editStockSchema = require("../schemas/stockSchemas/editStockSchema");
const addStockSchema = require("../schemas/stockSchemas/addStockSchema");
const {
  getAllStocks,
  getStockDetail,
  updateStock,
  createNewStock,
  deleteStock,
} = require("../controllers/stocksController");

const router = express.Router();

router
  .route("/")
  .get(isLoggedIn, getAllStocks)
  .post(isLoggedIn, isAdmin, validateSchema(addStockSchema), createNewStock);

router
  .route("/:id")
  .get(isLoggedIn, getStockDetail)
  .patch(isLoggedIn, isAdmin, validateSchema(editStockSchema), updateStock)
  .delete(isLoggedIn, isAdmin, deleteStock);

module.exports = router;
