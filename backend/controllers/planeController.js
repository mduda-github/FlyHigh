const PlaneRepository = require("../repository/sequalize/PlaneRepository");

exports.showPlaneList = (req, res, next) => {
  PlaneRepository.getPlanes().then((planes) => {
    res.render("pages/plane/list", {
      planes,
      navLocation: "plane",
    });
  });
};

exports.showAddPlaneForm = (req, res, next) => {
  res.render("pages/plane/form", {
    plane: {},
    pageTitle: req.__("plane.form.add.pageTitle"),
    formMode: "createNew",
    btnLabel: req.__("plane.form.add.btnLabel"),
    backBtnLabel: req.__("plane.form.add.backBtnLabel"),
    formAction: "/planes/add",
    navLocation: "plane",
    validationErrors: [],
  });
};

exports.showEditPlaneForm = (req, res, next) => {
  const planeId = req.params.planeId;
  PlaneRepository.getPlaneById(planeId).then((plane) => {
    res.render("pages/plane/form", {
      plane,
      pageTitle: req.__("plane.form.edit.pageTitle"),
      formMode: "edit",
      btnLabel: req.__("plane.form.edit.btnLabel"),
      backBtnLabel: req.__("plane.form.edit.backBtnLabel"),
      formAction: "/planes/edit",
      navLocation: "plane",
      validationErrors: [],
    });
  });
};

exports.showPlaneDetails = (req, res, next) => {
  const planeId = req.params.planeId;
  PlaneRepository.getPlaneById(planeId).then((plane) => {
    res.render("pages/plane/form", {
      plane,
      pageTitle: req.__("plane.form.details.pageTitle"),
      formMode: "showDetails",
      btnLabel: req.__("plane.form.details.btnLabel"),
      backBtnLabel: req.__("plane.form.details.backBtnLabel"),
      formAction: "",
      navLocation: "plane",
      validationErrors: [],
    });
  });
};

exports.addPlane = (req, res, next) => {
  const planeData = { ...req.body };
  PlaneRepository.createPlane(planeData)
    .then(() => {
      res.redirect("/planes");
    })
    .catch((err) => {
      res.render("pages/plane/form", {
        plane: planeData,
        pageTitle: req.__("plane.form.add.pageTitle"),
        formMode: "createNew",
        btnLabel: req.__("plane.form.add.btnLabel"),
        backBtnLabel: req.__("plane.form.add.backBtnLabel"),
        formAction: "/planes/add",
        navLocation: "plane",
        validationErrors: err.errors,
      });
    });
};

exports.updatePlane = (req, res, next) => {
  const planeId = req.body._id;
  const planeData = { ...req.body };
  PlaneRepository.updatePlane(planeId, planeData)
    .then(() => {
      res.redirect("/planes");
    })
    .catch((err) => {
      PlaneRepository.getPlaneById(planeId).then((plane) => {
        res.render("pages/plane/form", {
          plane,
          pageTitle: req.__("plane.form.edit.pageTitle"),
          formMode: "edit",
          btnLabel: req.__("plane.form.edit.btnLabel"),
          backBtnLabel: req.__("plane.form.edit.backBtnLabel"),
          formAction: "/planes/edit",
          navLocation: "plane",
          validationErrors: err.errors,
        });
      });
    });
};

exports.deletePlane = (req, res, next) => {
  const planeId = req.params.planeId;
  PlaneRepository.deletePlane(planeId).then(() => {
    res.redirect("/planes");
  });
};
