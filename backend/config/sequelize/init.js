const sequelize = require("./sequelize");
const authUtil = require("../../utils/authUtils");

const City = require("../../model/sequelize/City");
const Flight = require("../../model/sequelize/Flight");
const Plane = require("../../model/sequelize/Plane");
const User = require("../../model/sequelize/User");

module.exports = () => {
  City.hasMany(Flight, {
    as: "flights",
    foreignKey: { name: "city_id", allowNull: false },
    constraints: true,
    onDelete: "CASCADE",
  });
  Flight.belongsTo(City, {
    as: "city",
    foreignKey: { name: "city_id", allowNull: false },
  });

  Plane.hasMany(Flight, {
    as: "flights",
    foreignKey: { name: "plane_id", allowNull: false },
    constraints: true,
    onDelete: "CASCADE",
  });
  Flight.belongsTo(Plane, {
    as: "plane",
    foreignKey: { name: "plane_id", allowNull: false },
  });

  const passHash = authUtil.hashPassword('1234');
  let allCities, allPlanes;

  return sequelize
    .sync({ force: true })
    .then(() => User.findAll())
    .then((employee) => {
      if (!employee || employee.length === 0) {
        return User.bulkCreate([
          {
            firstName: "John",
            lastName: "Mayer",
            email: "john.mayer@mail.com",
            password: passHash
          },
          {
            firstName: "Judy",
            lastName: "Judge",
            email: "judy.judge@mail.com",
            password: passHash
          },
          {
            firstName: "Sam",
            lastName: "Smith",
            email: "sam.smith@mail.com",
            password: passHash
          },
        ]);
      }
    })
    .then(() => City.findAll())
    .then((cities) => {
      if (!cities || cities.length === 0) {
        return City.bulkCreate([
          { name: "London Stansted", code: "STN" },
          { name: "Barcelona", code: "BCN" },
          { name: "Palma", code: "PMI" },
        ]).then(() => City.findAll());
      } else {
        return cities;
      }
    })
    .then((cities) => {
      allCities = cities;
      return Plane.findAll();
    })
    .then((planes) => {
      if (!planes || planes.length === 0) {
        return Plane.bulkCreate([
          { name: "Boeing 737", seats: "126" },
          { name: "Boeing 737 MAX", seats: "172" },
        ]).then(() => Plane.findAll());
      } else {
        return planes;
      }
    })
    .then((planes) => {
      allPlanes = planes;
      return Flight.findAll();
    })
    .then((flights) => {
      if (!flights || flights.length === 0) {
        return Flight.bulkCreate([
          {
            city_id: allCities[0]._id,
            plane_id: allPlanes[0]._id,
            number: "FR3423",
            date: "2023-01-17 16:40:00",
            comment: "delayed",
          },
          {
            city_id: allCities[1]._id,
            plane_id: allPlanes[0]._id,
            number: "WI4013",
            date: "2023-01-18 08:00:00",
            comment: "",
          },
          {
            city_id: allCities[0]._id,
            plane_id: allPlanes[1]._id,
            number: "FR0761",
            date: "2023-01-19 21:30:00",
            comment: "overbooked",
          },
        ]);
      } else {
        return flights;
      }
    });
};
