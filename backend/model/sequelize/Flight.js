const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const Flight = sequelize.define("Flight", {
  _id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  number: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "notEmpty",
      },
      len: {
        args: [6, 6],
        msg: "len_6",
      },
    },
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "notEmpty",
      },
      customValidator(value) {
        if (new Date(value) < new Date()) {
          throw new Error("date");
        }
      },
    },
  },
  comment: {
    type: Sequelize.STRING(500),
    allowNull: true,
  },
  city_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "notEmpty",
      },
    },
  },
  plane_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "notEmpty",
      },
    },
  },
});

module.exports = Flight;
