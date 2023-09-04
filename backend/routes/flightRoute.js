const express = require("express");
const router = express.Router();

const flightController = require("../controllers/flightController");
const authUtils = require("../utils/authUtils");

router.get("/", flightController.showFlightList);
router.get("/add", authUtils.permitAuthenticatedUser, flightController.showAddFlightForm);
router.get("/edit/:flightId", authUtils.permitAuthenticatedUser, flightController.showEditFlightForm);
router.get("/details/:flightId", authUtils.permitAuthenticatedUser, flightController.showFlightDetails);
router.post("/add", authUtils.permitAuthenticatedUser, flightController.addFlight);
router.post("/edit", authUtils.permitAuthenticatedUser, flightController.updateFlight);
router.get("/delete/:flightId", authUtils.permitAuthenticatedUser, flightController.deleteFlight);

module.exports = router;
