const Sequelize = require("sequelize");

const City = require("../../model/sequelize/City");
const Flight = require("../../model/sequelize/Flight");
const Plane = require("../../model/sequelize/Plane");

exports.getFlights = () => {
  return Flight.findAll({
    include: [
      {
        model: City,
        as: "city",
      },
      {
        model: Plane,
        as: "plane",
      },
    ],
  });
};

exports.getFlightById = (flightId) => {
  return Flight.findByPk(flightId, {
    include: [
      {
        model: City,
        as: "city",
      },
      {
        model: Plane,
        as: "plane",
      },
    ],
  });
};

exports.createFlight = (newFlightData) => {
  return Flight.create({
    number: newFlightData.number,
    date: newFlightData.date,
    city_id: newFlightData.city_id,
    plane_id: newFlightData.plane_id,
    comment: newFlightData.comment,
  });
};

exports.updateFlight = (planetId, planeData) => {
  return Flight.update(planeData, { where: { _id: planetId } });
};

exports.deleteFlight = (flightId) => {
  return Flight.destroy({
    where: { _id: flightId },
  });
};

exports.deleteManyFlights = (flightIds) => {
  return Flight.find({ _id: { [Sequelize.Op.in]: flightIds } });
};
