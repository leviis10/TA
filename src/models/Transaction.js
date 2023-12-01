const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Stock = require("./Stock");
const TransactionGroup = require("./TransactionGroup");

const Transaction = sequelize.define("Transaction", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  stockId: {
    type: DataTypes.UUID,
    references: {
      model: Stock,
      key: "id",
    },
  },
  transactionGroupId: {
    type: DataTypes.UUID,
    references: {
      model: TransactionGroup,
      key: "id",
    },
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  note: {
    type: DataTypes.TEXT,
  },
});

module.exports = Transaction;
