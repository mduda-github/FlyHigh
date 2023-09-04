const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const authUtils = require("./utils/authUtils");

const indexRouter = require("./routes/index");
const cityRouter = require("./routes/cityRoute");
const flightRouter = require("./routes/flightRoute");
const userRouter = require("./routes/userRoute");
const planeRouter = require("./routes/planeRoute");
const loginRouter = require("./routes/loginRoute");
const cityApiRouter = require("./routes/api/CityApiRoute");
const flightApiRouter = require("./routes/api/FlightApiRoute");
const planeApiRouter = require("./routes/api/PlaneApiRoute");
const userApiRouter = require("./routes/api/UserApiRoute");
const authApiRouter = require("./routes/api/AuthApiRoute");
const sequelizeInit = require("./config/sequelize/init");
const i18n = require("i18n");
const cors = require("cors");

i18n.configure({
  locales: ["pl", "en"],
  directory: path.join(__dirname, "locales"),
  objectNotation: true,
  cookie: "fly-high-lang",
});

sequelizeInit().catch((err) => console.log(err));

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my_secret_password",
    resave: false,
  })
);
app.use((req, res, next) => {
  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser = loggedUser;
  if (!res.locals.loggedUser) {
    res.locals.loggedUser = undefined;
  }
  next();
});
app.use(cookieParser());
app.use((req, res, next) => {
  if (!res.locals.lang) {
    const currentLang = req.cookies["fly-high-lang"];
    res.locals.lang = currentLang;
  }
  next();
});
app.use(i18n.init);
app.use(cors());

app.use("/", indexRouter);
app.use("/cities", cityRouter);
app.use("/flights", flightRouter);
app.use("/users", authUtils.permitAuthenticatedUser, userRouter);
app.use("/planes", planeRouter);
app.use("/login", loginRouter);
app.use("/api/cities", cityApiRouter);
app.use("/api/flights", flightApiRouter);
app.use("/api/planes", planeApiRouter);
app.use("/api/users", userApiRouter);
app.use("/api/auth", authApiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
