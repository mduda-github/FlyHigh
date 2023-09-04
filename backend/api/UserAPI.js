const UserRepository = require("../repository/sequalize/UserRepository");

exports.getUsers = (req, res, next) => {
  UserRepository.getUsers()
    .then((users) => res.status(200).json(users))
    .catch((err) => console.log(err));
};

exports.getUserById = (req, res, next) => {
  const userId = req.params.userId;
  UserRepository.getUserById(userId).then((user) => {
    if (!user) {
      res.status(404).json({
        message: `User with id: ${userId} is not found`,
      });
    } else {
      res.status(200).json(user);
    }
  });
};

exports.createUser = (req, res, next) => {
  UserRepository.createUser(req.body)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateUser = (req, res, next) => {
  const userId = req.params.userId;
  UserRepository.updateUser(userId, req.body)
    .then((result) => {
      res.status(200).json({ message: "User updated! :)", user: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  UserRepository.deleteUser(userId)
    .then((result) => {
      res.status(200).json({ message: "User removed! :(", user: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
