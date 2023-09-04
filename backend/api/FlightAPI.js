const FlightRepository = require("../repository/sequalize/FlightRepository");

exports.getFlights = (req, res, next) => {
  FlightRepository.getFlights()
    .then((flights) => res.status(200).json(flights))
    .catch((err) => console.log(err));
};

exports.getFlightById = (req, res, next) => {
  const flightId = req.params.flightId;
  FlightRepository.getFlightById(flightId).then((flight) => {
    if (!flight) {
      res.status(404).json({
        message: `Flight with id: ${flightId} is not found`,
      });
    } else {
      res.status(200).json(flight);
    }
  });
};

exports.createFlight = (req, res, next) => {
  FlightRepository.createFlight(req.body)
    .then((newFlight) => {
      res.status(201).json(newFlight);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateFlight = (req, res, next) => {
  const flightId = req.params.flightId;
  FlightRepository.updateFlight(flightId, req.body)
    .then((result) => {
      res.status(200).json({ message: "Flight updated! :)", flight: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteFlight = (req, res, next) => {
  const flightId = req.params.flightId;
  FlightRepository.deleteFlight(flightId)
    .then((result) => {
      res.status(200).json({ message: "Flight removed! :(", flight: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
