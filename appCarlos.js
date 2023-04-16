// paquetes
const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const session = require("express-session");
const flash = require("connect-flash");

// routes
const errorController = require("./controllers/errorController");
const authRouter = require("./routes/auth");

const imageStorage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, "images");
  },

  filename: (request, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

// conexion bd
const connection = require("./context/appContext");

// models
const Usuarios = require("./models/Usuario");

const app = express();

app.engine(
  "hbs",
  engine({
    layoutsDir: "views/layouts/",
    defaultLayout: "main-layout",
    extname: "hbs",
  })
);

// vistas
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));

// carpetas publicas
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(
  session({
    secret: "socialNet",
    resave: true,
    saveUninitialized: false,
  })
);

app.use(
  multer({
    storage: imageStorage,
  }).single("Foto")
);

app.use(flash());

app.use((request, response, next) => {
  const errors = request.flash("Error");
  const success = request.flash("Success");

  response.locals.isAuthenticated = request.session.LoggedIn;
  response.locals.user = request.session.user;
  response.locals.errorMessages = errors;
  response.locals.hasErrorMessages = errors.length > 0;
  response.locals.successMessages = success;
  response.locals.hasSuccessMessages = success.length > 0;

  next();
});

app.use(authRouter);

app.use("/", errorController.Get404);

// sincronizar base de datos
connection
  .sync({
    /*alter: true*/
  })
  .then(() => {
    // lanzar aplicacion
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
