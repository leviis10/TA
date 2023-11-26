const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Supplier = require("./Supplier");

const Stock = sequelize.define("Stock", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  supplier: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Supplier,
      key: "id",
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  description: {
    type: DataTypes.TEXT,
  },
});

module.exports = Stock;
