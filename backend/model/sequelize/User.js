const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const User = sequelize.define("User", {
  _id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  firstName: {
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
  lastName: {
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
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: "notEmpty",
      },
      isEmail: {
        msg: "email",
      },
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "notEmpty",
      },
      len: {
        args: [5, 60],
        msg: "len_5_60",
      },
    },
  },
});

module.exports = User;
