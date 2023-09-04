const express = require("express");
const router = express.Router();

const cityController = require("../controllers/cityController");
const authUtils = require("../utils/authUtils");

router.get("/", cityController.showCityList);
router.get("/add", authUtils.permitAuthenticatedUser, cityController.showAddCityForm);
router.get("/edit/:cityId", authUtils.permitAuthenticatedUser, cityController.showEditCityForm);
router.get("/details/:cityId", authUtils.permitAuthenticatedUser, cityController.showCityDetails);
router.post("/add", authUtils.permitAuthenticatedUser, cityController.addCity);
router.post("/edit", authUtils.permitAuthenticatedUser, cityController.updateCity);
router.get("/delete/:cityId", authUtils.permitAuthenticatedUser, cityController.deleteCity);

module.exports = router;
