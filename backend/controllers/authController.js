const UserRepository = require("../repository/sequalize/UserRepository");
const authUtil = require("../utils/authUtils");

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    UserRepository.findByEmail(email)
        .then(emp => {
            if (!emp) {
                res.render('pages/login/form', {
                    navLocation: '',
                    loginError: req.__('validationMessage.login')
                })
            } else if (authUtil.comparePasswords(password, emp.password)) {
                req.session.loggedUser = emp;
                res.redirect('/');
            } else {
                res.render('pages/login/form', {
                    navLocation: '',
                    loginError: req.__('validationMessage.login')
                })
            }
        })
        .catch(err => console.log(err))
}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}
