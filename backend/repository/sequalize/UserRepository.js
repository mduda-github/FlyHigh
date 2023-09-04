const User = require("../../model/sequelize/User");
const authUtil = require("../../utils/authUtils");

exports.getUsers = () => {
  return User.findAll();
};

exports.getUserById = (userId) => {
  return User.findByPk(userId);
};

exports.createUser = (newUserData) => {
  return User.create({
    firstName: newUserData.firstName,
    lastName: newUserData.lastName,
    email: newUserData.email,
    password: authUtil.hashPassword(newUserData.password),
  });
};

exports.updateUser = (userId, userData) => {
  return User.update(
    {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: authUtil.hashPassword(userData.password),
    },
    { where: { _id: userId } }
  );
};

exports.deleteUser = (userId) => {
  return User.destroy({
    where: { _id: userId },
  });
};

exports.findByEmail = (email) => {
  return User.findOne({
    where: { email: email },
  });
};
