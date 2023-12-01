const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Employee = require("./Employee");

const TransactionGroup = sequelize.define("TransactionGroup", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  seller: {
    type: DataTypes.UUID,
  },
  buyer: {
    type: DataTypes.UUID,
    references: {
      model: Employee,
      key: "id",
    },
  },
  type: {
    type: DataTypes.ENUM("sell", "purchase"),
    allowNull: false,
  },
});

module.exports = TransactionGroup;
