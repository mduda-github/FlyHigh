const express = require("express");
const router = express.Router();

const flightApiController = require("../../api/FlightAPI");
const isAuth = require("../../middleware/isAuth");

router.get("/", flightApiController.getFlights);
router.get("/:flightId", flightApiController.getFlightById);
router.post("/", isAuth, flightApiController.createFlight);
router.put("/:flightId", isAuth, flightApiController.updateFlight);
router.delete("/:flightId", isAuth, flightApiController.deleteFlight);

module.exports = router;
