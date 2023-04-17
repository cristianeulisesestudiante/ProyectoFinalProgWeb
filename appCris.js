//imports
const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const sequelize = require("./context/cristContext");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const userCommentHelper = require("./util/helpers/userComment");
//initialization
const app = express();
//models
const Posts = require("./models/Posts");
const Comentarios = require("./models/Comentarios");
const Respuestas = require("./models/Respuestas");
const Usuarios = require("./models/Usuariossss");
const Amigos = require('./models/Amigos')
const Notificaciones = require('./models/Notificaciones')
//routes
const errorController = require("./controllers/ErrorController");
const homeRouter = require("./routes/home");
const amigosRouter = require("./routes/amigos");

//other
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
      defaultLayout: "temporal-layout-cris",
      extname: "hbs",
      helpers: { userComment: userCommentHelper.UserComment },
   })
);

app.set("view engine", "hbs");
app.set("views", "views");
//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(multer({ storage: imageStorage }).single("Image"));
//views
app.use(homeRouter);
app.use(amigosRouter);
app.use(errorController.GetNotFound);

Posts.belongsTo(Comentarios, { constraint: true, onDelete: "CASCADE" });
Posts.belongsTo(Respuestas, { constraint: true, onDelete: "CASCADE" });
Posts.belongsTo(Usuarios, { constraint: true, onDelete: "CASCADE" });
Comentarios.belongsTo(Respuestas, { constraint: true, onDelete: "CASCADE" });
Comentarios.belongsTo(Posts, { constraint: true, onDelete: "CASCADE" });
Respuestas.belongsTo(Comentarios, { constraint: true, onDelete: "CASCADE" });
Respuestas.belongsTo(Posts, { constraint: true, onDelete: "CASCADE" });
Amigos.belongsTo(Usuarios, { constraint: true, onDelete: "CASCADE" })
Notificaciones.belongsTo(Usuarios, { constraint: true, onDelete: "CASCADE" })
// Usuarios.belongsTo(Amigos, { constraint: true, onDelete: "CASCADE" })
Posts.hasMany(Comentarios);
Usuarios.hasMany(Amigos)
Comentarios.hasMany(Respuestas);
Usuarios.hasMany(Posts);

sequelize
   .sync({})
   .then((result) => {
      app.listen(4000);
   })
   .catch((err) => {
      console.log(err);
   });
