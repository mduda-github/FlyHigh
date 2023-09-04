const CityRepository = require("../repository/sequalize/CityRepository");

exports.showCityList = (req, res, next) => {
  CityRepository.getCities().then((cities) => {
    res.render("pages/city/list", {
      cities,
      navLocation: "city",
    });
  });
};

exports.showAddCityForm = (req, res, next) => {
  res.render("pages/city/form", {
    city: {},
    pageTitle: req.__('city.form.add.pageTitle'),
    formMode: "createNew",
    btnLabel: req.__('city.form.add.btnLabel'),
    backBtnLabel: req.__('city.form.add.backBtnLabel'),
    formAction: "/cities/add",
    navLocation: "city",
    validationErrors: [],
  });
};

exports.showEditCityForm = (req, res, next) => {
  const cityId = req.params.cityId;
  CityRepository.getCityById(cityId).then((city) => {
    res.render("pages/city/form", {
      city,
      pageTitle: req.__('city.form.edit.pageTitle'),
      formMode: "edit",
      btnLabel: req.__('city.form.edit.btnLabel'),
      backBtnLabel: req.__('city.form.edit.backBtnLabel'),
      formAction: "/cities/edit",
      navLocation: "city",
      validationErrors: [],
    });
  });
};

exports.showCityDetails = (req, res, next) => {
  const cityId = req.params.cityId;
  CityRepository.getCityById(cityId).then((city) => {
    res.render("pages/city/form", {
      city,
      pageTitle: req.__('city.form.details.pageTitle'),
      formMode: "showDetails",
      btnLabel: req.__('city.form.details.btnLabel'),
      backBtnLabel: req.__('city.form.details.backBtnLabel'),
      formAction: "",
      navLocation: "city",
      validationErrors: [],
    });
  });
};

exports.addCity = (req, res, next) => {
  const cityData = { ...req.body };
  CityRepository.createCity(cityData)
    .then(() => {
      res.redirect("/cities");
    })
    .catch((err) => {
      res.render("pages/city/form", {
        city: cityData,
        pageTitle: req.__('city.form.add.pageTitle'),
        formMode: "createNew",
        btnLabel: req.__('city.form.add.btnLabel'),
        backBtnLabel: req.__('city.form.add.backBtnLabel'),
        formAction: "/cities/add",
        navLocation: "city",
        validationErrors: err.errors,
      });
    });
};

exports.updateCity = (req, res, next) => {
  const cityId = req.body._id;
  const cityData = { ...req.body };
  CityRepository.updateCity(cityId, cityData)
    .then(() => {
      res.redirect("/cities");
    })
    .catch((err) => {
      CityRepository.getCityById(cityId).then((city) => {
        res.render("pages/city/form", {
          city,
          pageTitle: req.__('city.form.edit.pageTitle'),
          formMode: "edit",
          btnLabel: req.__('city.form.edit.btnLabel'),
          backBtnLabel: req.__('city.form.edit.backBtnLabel'),
          formAction: "/cities/edit",
          navLocation: "city",
          validationErrors: err.errors,
        });
      });
    });
};

exports.deleteCity = (req, res, next) => {
  const cityId = req.params.cityId;
  CityRepository.deleteCity(cityId).then(() => {
    res.redirect("/cities");
  });
};
