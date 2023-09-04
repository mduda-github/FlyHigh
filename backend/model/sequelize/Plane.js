const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const Plane = sequelize.define("Plane", {
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
  seats: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "notEmpty",
      },
      isNumeric: {
        msg: "number",
      },
    },
  },
});

module.exports = Plane;
