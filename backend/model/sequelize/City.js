const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const City = sequelize.define("City", {
  _id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "notEmpty",
      },
      len: {
        args: [2, 60],
        msg: "len_2_60",
      },
    },
  },
  code: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: "notEmpty",
      },
      len: {
        args: [3, 3],
        msg: "len_3",
      },
    },
  },
});

module.exports = City;
