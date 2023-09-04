const City = require("../../model/sequelize/City");
const Flight = require("../../model/sequelize/Flight");
const Plane = require("../../model/sequelize/Plane");

exports.getPlanes = () => {
  return Plane.findAll();
};

exports.getPlaneById = (planeId) => {
  return Plane.findByPk(planeId, {
    include: [
      {
        model: Flight,
        as: "flights",
        includes: [
          {
            model: City,
            as: "city",
          },
        ],
      },
    ],
  });
};

exports.createPlane = (newPlaneData) => {
  return Plane.create({
    name: newPlaneData.name,
    seats: newPlaneData.seats,
  });
};

exports.updatePlane = (planeId, planeData) => {
  return Plane.update(planeData, { where: { _id: planeId } });
};

exports.deletePlane = (planeId) => {
  return Plane.destroy({
    where: { _id: planeId },
  });
};
