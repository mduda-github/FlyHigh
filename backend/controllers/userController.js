const UserRepository = require("../repository/sequalize/UserRepository");

exports.showUserList = (req, res, next) => {
  UserRepository.getUsers().then((users) => {
    res.render("pages/user/list", {
      users,
      navLocation: "user",
    });
  });
};

exports.showAddUserForm = (req, res, next) => {
  res.render("pages/user/form", {
    user: {},
    pageTitle: req.__("user.form.add.pageTitle"),
    formMode: "createNew",
    btnLabel: req.__("user.form.add.btnLabel"),
    backBtnLabel: req.__("user.form.add.backBtnLabel"),
    formAction: "/users/add",
    navLocation: "user",
    validationErrors: [],
  });
};

exports.showEditUserForm = (req, res, next) => {
  const userId = req.params.userId;
  UserRepository.getUserById(userId).then((user) => {
    res.render("pages/user/form", {
      user,
      pageTitle: req.__("user.form.edit.pageTitle"),
      formMode: "edit",
      btnLabel: req.__("user.form.edit.btnLabel"),
      backBtnLabel: req.__("user.form.edit.backBtnLabel"),
      formAction: "/users/edit",
      navLocation: "user",
      validationErrors: [],
    });
  });
};

exports.showUserDetails = (req, res, next) => {
  const userId = req.params.userId;
  UserRepository.getUserById(userId).then((user) => {
    console.log(user);
    res.render("pages/user/form", {
      user,
      pageTitle: req.__("user.form.details.pageTitle"),
      formMode: "showDetails",
      btnLabel: req.__("user.form.details.btnLabel"),
      backBtnLabel: req.__("user.form.details.backBtnLabel"),
      formAction: "",
      navLocation: "user",
      validationErrors: [],
    });
  });
};

exports.addUser = (req, res, next) => {
  const userData = { ...req.body };
  UserRepository.createUser(userData)
    .then(() => {
      res.redirect("/users");
    })
    .catch((err) => {
      res.render("pages/user/form", {
        user: userData,
        pageTitle: req.__("user.form.add.pageTitle"),
        formMode: "createNew",
        btnLabel: req.__("user.form.add.btnLabel"),
        backBtnLabel: req.__("user.form.add.backBtnLabel"),
        formAction: "/users/add",
        navLocation: "user",
        validationErrors: err.errors,
      });
    });
};

exports.updateUser = (req, res, next) => {
  const userId = req.body._id;
  const userData = { ...req.body };
  UserRepository.updateUser(userId, userData)
    .then(() => {
      res.redirect("/users");
    })
    .catch((err) => {
      UserRepository.getUserById(userId).then((user) => {
        res.render("pages/user/form", {
          user,
          pageTitle: req.__("user.form.edit.pageTitle"),
          formMode: "edit",
          btnLabel: req.__("user.form.edit.btnLabel"),
          backBtnLabel: req.__("user.form.edit.backBtnLabel"),
          formAction: "/users/edit",
          navLocation: "user",
          validationErrors: err.errors,
        });
      });
    });
};

exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  UserRepository.deleteUser(userId).then(() => {
    res.redirect("/users");
  });
};
