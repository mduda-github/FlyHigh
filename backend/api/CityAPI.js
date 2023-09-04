const CityRepository = require("../repository/sequalize/CityRepository");

exports.getCities = (req, res, next) => {
  CityRepository.getCities()
    .then((cities) => res.status(200).json(cities))
    .catch((err) => console.log(err));
};

exports.getCityById = (req, res, next) => {
  const cityId = req.params.cityId;
  CityRepository.getCityById(cityId).then((city) => {
    if (!city) {
      res.status(404).json({
        message: `City with id: ${cityId} is not found`,
      });
    } else {
      res.status(200).json(city);
    }
  });
};

exports.createCity = (req, res, next) => {
  CityRepository.createCity(req.body)
    .then((newCity) => {
      res.status(201).json(newCity);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.updateCity = (req, res, next) => {
  const cityId = req.params.cityId;
  CityRepository.updateCity(cityId, req.body)
    .then(() => {
      res.status(200).json({ message: "City updated! :)" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteCity = (req, res, next) => {
  const cityId = req.params.cityId;
  CityRepository.deleteCity(cityId)
    .then(() => {
      res.status(200).json({ message: "City removed! :(" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
