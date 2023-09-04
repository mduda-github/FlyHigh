const express = require("express");
const router = express.Router();

const planeController = require("../controllers/planeController");
const authUtils = require("../utils/authUtils");

router.get("/", planeController.showPlaneList);
router.get("/add", authUtils.permitAuthenticatedUser, planeController.showAddPlaneForm);
router.get("/edit/:planeId", authUtils.permitAuthenticatedUser, planeController.showEditPlaneForm);
router.get("/details/:planeId", authUtils.permitAuthenticatedUser, planeController.showPlaneDetails);
router.post("/add", authUtils.permitAuthenticatedUser, planeController.addPlane);
router.post("/edit", authUtils.permitAuthenticatedUser, planeController.updatePlane);
router.get("/delete/:planeId", authUtils.permitAuthenticatedUser, planeController.deletePlane);

module.exports = router;
