//imports
const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const sequelize = require("./context/connection");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const session = require("express-session");
const flash = require("connect-flash");
//helpers
const userCommentHelper = require("./util/helpers/userComment");
const dateTimeHelper = require("./util/helpers/datetime");
const compareH = require("./util/helpers/compare");
//initialization
const app = express();
//models
const Posts = require("./models/Posts");
const Comentarios = require("./models/Comentarios");
const Respuestas = require("./models/Respuestas");
const Usuarios = require("./models/Usuarios");
const Amigos = require("./models/Amigos");
const Notificaciones = require("./models/Notificaciones");
const Invitaciones = require("./models/invitadosEventos");
const Eventos = require("./models/eventos");
//routes
const errorController = require("./controllers/ErrorController");
const homeRouter = require("./routes/home");
const amigosRouter = require("./routes/amigos");
const eventsRouter = require("./routes/eventos");
const authRouter = require("./routes/auth");
const notificacionesRouter = require("./routes/notificaciones");

//config
const imageStorage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "images");
   },
   filename: (req, file, cb) => {
      cb(null, `${uuidv4()}-${file.originalname}`);
   },
});

//engine
app.engine(
   "hbs",
   engine({
      layoutsDir: "views/layouts",
      defaultLayout: "main-layout",
      extname: "hbs",
      helpers: {
         userComment: userCommentHelper.UserComment,
         equalValue: compareH.EqualValue,
         dateTime: dateTimeHelper.DateTime,
         hasFoto: compareH.hasFoto,
      },
   })
);
app.set("view engine", "hbs");
app.set("views", "views");

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(multer({ storage: imageStorage }).single("Image"));

app.use(
   session({
      secret: "socialNet",
      resave: true,
      saveUninitialized: false,
   })
);

app.use(flash());

app.use((request, response, next) => {
   if (!request.session) {
      return next();
   }

   if (!request.session.user) {
      return next();
   }

   request.user = request.session.user;
   next();
});

app.use(async (request, response, next) => {
   const errors = request.flash("Error");
   const success = request.flash("Success");

   if (request.user) {
      const notificacionesData = await Notificaciones.findAll({
         where: { usuarioSolicitadoId: request.user.id },
      });

      console.log(notificacionesData);

      const notificaciones = notificacionesData.map((notificacion) => {
         return notificacion.dataValues;
      });

      response.locals.notificacionesNumber = notificaciones.length;
   }

   response.locals.isAuthenticated = request.session.LoggedIn;
   response.locals.user = request.session.user;
   response.locals.errorMessages = errors;
   response.locals.hasErrorMessages = errors.length > 0;
   response.locals.successMessages = success;
   response.locals.hasSuccessMessages = success.length > 0;

   next();
});

//views
app.use(notificacionesRouter);
app.use(authRouter);
app.use(homeRouter);
app.use(amigosRouter);
app.use(eventsRouter);
app.use(errorController.GetNotFound);

//relaciones de base de datos
Posts.belongsTo(Usuarios, { constraint: true, onDelete: "CASCADE" });
Posts.hasMany(Comentarios);
Usuarios.hasMany(Amigos, { foreignKey: "usuarioAmigoId", as: "amigo", onDelete: "CASCADE" });
Usuarios.hasMany(Posts);
Usuarios.hasMany(Eventos);
Usuarios.hasMany(Notificaciones, { constraint: true, onDelete: "CASCADE" });
Comentarios.belongsTo(Usuarios, { constraint: true, onDelete: "CASCADE" });
Comentarios.belongsTo(Posts, { constraint: true, onDelete: "CASCADE" });
Respuestas.belongsTo(Comentarios, { constraint: true, onDelete: "CASCADE" });
Respuestas.belongsTo(Usuarios, { constraint: true, onDelete: "CASCADE" });
Respuestas.belongsTo(Posts, { constraint: true, onDelete: "CASCADE" });
Eventos.belongsTo(Usuarios, { constraint: true, onDelete: "CASCADE" });
Comentarios.hasMany(Respuestas);
Amigos.belongsTo(Usuarios, {
   constraint: true,
   foreignKey: "usuarioAmigoId",
   as: "amigo",
   onDelete: "CASCADE",
});
Invitaciones.belongsTo(Eventos, { constraint: true, onDelete: "CASCADE" });
Invitaciones.belongsTo(Usuarios, { constraint: true, onDelete: "CASCADE" });
Eventos.hasMany(Invitaciones);
Notificaciones.belongsTo(Usuarios, { constraint: true, onDelete: "CASCADE" });

sequelize
   .sync({})
   .then((result) => {
      app.listen(3000);
   })
   .catch((err) => {
      console.log(err);
   });
