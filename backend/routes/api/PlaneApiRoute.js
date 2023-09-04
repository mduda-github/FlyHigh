const express = require("express");
const router = express.Router();

const planeApiController = require("../../api/PlaneAPI");
const isAuth = require("../../middleware/isAuth");

router.get("/", planeApiController.getPlanes);
router.get("/:planeId", planeApiController.getPlaneById);
router.post("/", isAuth, planeApiController.createPlane);
router.put("/:planeId", isAuth, planeApiController.updatePlane);
router.delete("/:planeId", isAuth, planeApiController.deletePlane);

module.exports = router;
