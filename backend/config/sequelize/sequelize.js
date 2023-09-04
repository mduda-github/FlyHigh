const Sequelize = require("sequelize");

const sequelize = new Sequelize("TinExampleSequelize", "root", "root", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
