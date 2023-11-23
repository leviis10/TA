const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdmin = require("../middlewares/isAdmin");
const Supplier = require("../models/Supplier");
const catchAsync = require("../utils/catchAsync");
const validateSchema = require("../middlewares/validateSchema");
const supplierSchema = require("../schemas/supplierSchema");

const router = express.Router();

router.get(
  "/",
  isLoggedIn,
  isAdmin,
  catchAsync(async (req, res) => {
    const suppliers = await Supplier.findAll();
    res.send(suppliers);
  })
);

router.get(
  "/:id",
  isLoggedIn,
  isAdmin,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const supplier = await Supplier.findByPk(id);
    res.send(supplier);
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
