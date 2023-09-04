const PlaneRepository = require("../repository/sequalize/PlaneRepository");

exports.getPlanes = (req, res, next) => {
  PlaneRepository.getPlanes()
    .then((planes) => res.status(200).json(planes))
    .catch((err) => console.log(err));
};

exports.getPlaneById = (req, res, next) => {
  const planeId = req.params.planeId;
  PlaneRepository.getPlaneById(planeId).then((plane) => {
    if (!plane) {
      res.status(404).json({
        message: `Plane with id: ${planeId} is not found`,
      });
    } else {
      res.status(200).json(plane);
    }
  });
};

exports.createPlane = (req, res, next) => {
  PlaneRepository.createPlane(req.body)
    .then((newPlane) => {
      res.status(201).json(newPlane);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updatePlane = (req, res, next) => {
  const planeId = req.params.planeId;
  PlaneRepository.updatePlane(planeId, req.body)
    .then((result) => {
      res.status(200).json({ message: "Plane updated! :)", plane: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deletePlane = (req, res, next) => {
  const planeId = req.params.planeId;
  PlaneRepository.deletePlane(planeId)
    .then((result) => {
      res.status(200).json({ message: "Plane removed! :(", plane: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
