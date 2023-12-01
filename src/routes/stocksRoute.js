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

const router = express.Router();

router.get(
  "/",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { query } = req.query;
    let stocks;
    if (!query) {
      stocks = await Stock.findAll({ include: Supplier });
    }
    if (query) {
      stocks = await Stock.findAll({
        include: Supplier,
        where: {
          name: {
            [Op.iLike]: `%${query}%`,
          },
        },
      });
    }
    res.send(stocks);
  })
);

router.get(
  "/:id",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const stock = await Stock.findByPk(id, { include: Supplier });
    if (!stock) {
      throw new ExpressError("Stock not found", 404);
    }
    res.send(stock);
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
