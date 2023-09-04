const express = require("express");
const router = express.Router();

const userApiController = require("../../api/UserAPI");
const isAuth = require("../../middleware/isAuth");

router.get("/", userApiController.getUsers);
router.get("/:userId", userApiController.getUserById);
router.post("/", isAuth, userApiController.createUser);
router.put("/:userId", isAuth, userApiController.updateUser);
router.delete("/:userId", isAuth, userApiController.deleteUser);

module.exports = router;
