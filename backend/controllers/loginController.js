exports.showLoginForm = (req, res, next) => {
    res.render("pages/login/form", {
      navLocation: "login",
      loginError: ''
    });
};

