const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "postgres",
  database: "SITOBASM",
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: "localhost",
  port: "5432",
  logging: false,
});

module.exports = sequelize;
