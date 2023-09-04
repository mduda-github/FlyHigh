const express = require("express");
const router = express.Router();

const cityApiController = require("../../api/CityAPI");
const isAuth = require("../../middleware/isAuth");

router.get("/", cityApiController.getCities);
router.get("/:cityId", cityApiController.getCityById);
router.post("/", isAuth, cityApiController.createCity);
router.put("/:cityId", isAuth, cityApiController.updateCity);
router.delete("/:cityId", isAuth, cityApiController.deleteCity);

module.exports = router;
