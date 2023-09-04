const express = require("express");
const router = express.Router();
const AuthController = require('../controllers/authController');
const LangController = require('../controllers/langController');

router.get("/", function (req, res, next) {
  res.render("index", { navLocation: "main", loginError: '' });
});
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);
router.get('/changeLang/:lang', LangController.changeLang);

module.exports = router;
