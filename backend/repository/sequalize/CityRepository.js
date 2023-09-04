const City = require("../../model/sequelize/City");
const Flight = require("../../model/sequelize/Flight");
const Plane = require("../../model/sequelize/Plane");

exports.getCities = () => {
  return City.findAll();
};

exports.getCityById = (cityId) => {
  return City.findByPk(cityId, {
    include: [
      {
        model: Flight,
        as: "flights",
        includes: [
          {
            model: Plane,
            as: "plane",
          },
        ],
      },
    ],
  });
};

exports.createCity = (newCityData) => {
  return City.create({
    name: newCityData.name,
    code: newCityData.code,
  });
};

exports.updateCity = (cityId, cityData) => {
  return City.update(cityData, { where: { _id: cityId } });
};

exports.deleteCity = (cityId) => {
  return City.destroy({
    where: { _id: cityId },
  });
};
