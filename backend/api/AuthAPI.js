const UserRepository = require("../repository/sequalize/UserRepository");
const config = require("../config/auth/key");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  UserRepository.findByEmail(email).then((user) => {
    if (!user) {
      return res.status(401).send({ message: "login" });
    }

    bcrypt
      .compare(password, user.password)
      .then((isEqual) => {
        console.log(password, user.password, isEqual);
        if (!isEqual) {
          return res.status(401).send({ message: "login" });
        }
        const token = jwt.sign(
          {
            email: user.email,
            userId: user._id,
          },
          config.secret,
          { expiresIn: "1h" }
        );
        res.status(200).json({ token, userId: user._id });
      })
      .catch((err) => {
        console.log(err);
        res.status(501);
      });
  });
};
