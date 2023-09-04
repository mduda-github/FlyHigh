const FlightRepository = require("../repository/sequalize/FlightRepository");
const CityRepository = require("../repository/sequalize/CityRepository");
const PlaneRepository = require("../repository/sequalize/PlaneRepository");

exports.showFlightList = (req, res, next) => {
  FlightRepository.getFlights().then((flights) => {
    res.render("pages/flight/list", {
      flights,
      navLocation: "flight",
    });
  });
};

exports.showAddFlightForm = (req, res, next) => {
  let allCities, allPlanes;
  CityRepository.getCities()
    .then((cities) => {
      allCities = cities;
      return PlaneRepository.getPlanes();
    })
    .then((planes) => {
      allPlanes = planes;
      res.render("pages/flight/form", {
        flight: {},
        allCities,
        allPlanes,
        pageTitle: req.__("flight.form.add.pageTitle"),
        formMode: "createNew",
        btnLabel: req.__("flight.form.add.btnLabel"),
        backBtnLabel: req.__("flight.form.add.backBtnLabel"),
        formAction: "/flights/add",
        navLocation: "flight",
        validationErrors: [],
      });
    });
};

exports.showEditFlightForm = (req, res, next) => {
  const flightId = req.params.flightId;
  let allCities, allPlanes;
  CityRepository.getCities()
    .then((cities) => {
      allCities = cities;
      return PlaneRepository.getPlanes();
    })
    .then((planes) => {
      allPlanes = planes;
      return FlightRepository.getFlightById(flightId);
    })
    .then((flight) => {
      res.render("pages/flight/form", {
        flight,
        allCities,
        allPlanes,
        pageTitle: req.__("flight.form.edit.pageTitle"),
        formMode: "edit",
        btnLabel: req.__("flight.form.edit.btnLabel"),
        backBtnLabel: req.__("flight.form.edit.backBtnLabel"),
        formAction: "/flights/edit",
        navLocation: "flight",
        validationErrors: [],
      });
    });
};

exports.showFlightDetails = (req, res, next) => {
  const flightId = req.params.flightId;
  let allCities, allPlanes;
  CityRepository.getCities()
    .then((cities) => {
      allCities = cities;
      return PlaneRepository.getPlanes();
    })
    .then((planes) => {
      allPlanes = planes;
      return FlightRepository.getFlightById(flightId);
    })
    .then((flight) => {
      res.render("pages/flight/form", {
        flight,
        allCities,
        allPlanes,
        pageTitle: req.__("flight.form.details.pageTitle"),
        formMode: "showDetails",
        btnLabel: req.__("flight.form.details.btnLabel"),
        backBtnLabel: req.__("flight.form.details.backBtnLabel"),
        formAction: "",
        navLocation: "flight",
        validationErrors: [],
      });
    });
};

exports.addFlight = (req, res, next) => {
  const flightData = { ...req.body };

  FlightRepository.createFlight(flightData)
    .then(() => {
      res.redirect("/flights");
    })
    .catch((err) => {
      let allCities, allPlanes;
      CityRepository.getCities()
        .then((cities) => {
          allCities = cities;
          return PlaneRepository.getPlanes();
        })
        .then((planes) => {
          allPlanes = planes;
          res.render("pages/flight/form", {
            flight: flightData,
            allCities,
            allPlanes,
            pageTitle: req.__("flight.form.add.pageTitle"),
            formMode: "createNew",
            btnLabel: req.__("flight.form.add.btnLabel"),
            backBtnLabel: req.__("flight.form.add.backBtnLabel"),
            formAction: "/flights/add",
            navLocation: "flight",
            validationErrors: err.errors,
          });
        });
    });
};

exports.updateFlight = (req, res, next) => {
  const flightId = req.body._id;
  const flightData = { ...req.body };
  FlightRepository.updateFlight(flightId, flightData)
    .then(() => {
      res.redirect("/flights");
    })
    .catch((err) => {
      let allCities, allPlanes;
      CityRepository.getCities()
        .then((cities) => {
          allCities = cities;
          return PlaneRepository.getPlanes();
        })
        .then((planes) => {
          allPlanes = planes;
          return FlightRepository.getFlightById(flightId);
        })
        .then((flight) => {
          res.render("pages/flight/form", {
            flight,
            allCities,
            allPlanes,
            pageTitle: req.__("flight.form.edit.pageTitle"),
            formMode: "edit",
            btnLabel: req.__("flight.form.edit.btnLabel"),
            backBtnLabel: req.__("flight.form.edit.backBtnLabel"),
            formAction: "/flights/edit",
            navLocation: "flight",
            validationErrors: err.errors,
          });
        });
    });
};

exports.deleteFlight = (req, res, next) => {
  const flightId = req.params.flightId;
  FlightRepository.deleteFlight(flightId).then(() => {
    res.redirect("/flights");
  });
};
