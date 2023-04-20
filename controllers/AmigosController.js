const { Op, where } = require("sequelize");
const Post = require("../models/Posts");
const Comentarios = require("../models/Comentarios");
const Respuestas = require("../models/Respuestas");
const Amigos = require("../models/Amigos");
const Usuarios = require("../models/Usuarios");
const Notificaciones = require("../models/Notificaciones");

exports.GetAmigosPost = async (req, res, next) => {
   const set = new Set();

   try {
      let result = await Amigos.findAll({ where: { usuarioId: req.user.id } });
      let amigos = result.map((result) => result.dataValues);
      amigos.forEach((element) => {
         set.add(element.usuarioAmigoId);
      });
      const amigosIds = [...set];
      result = await Post.findAll({
         where: { usuarioId: amigosIds },
         include: [{ model: Usuarios }],
      });
      const posts = result.map((result) => result.dataValues);
      result = await Comentarios.findAll({ include: [{ model: Usuarios }] });
      const comments = result.map((result) => result.dataValues);
      result = await Respuestas.findAll({ include: [{ model: Usuarios }] });
      const respuestas = result.map((result) => result.dataValues);
      result = await Usuarios.findAll({ where: { id: amigosIds } });
      const usuarios = result.map((result) => result.dataValues);

      res.render("amigos/amigos-post", {
         posts: posts.reverse(),
         comments: comments,
         respuestas: respuestas,
         usuarios: usuarios,
         amigosActive: true,
         pageTitle: "Amigos",
      });
   } catch (error) {
      console.log(error);
   }
};

exports.PostReplyComment = async (req, res, next) => {
   const description = req.body.Comentario;
   const comentarioId = req.body.ComentarioId;
   const postId = req.body.PostId;
   try {
      const result = await Respuestas.create({
         description: description,
         comentarioId: comentarioId,
         postId: postId,
         usuarioId: req.user.id,
      });
      res.redirect("/amigos");
   } catch (error) {
      console.log(error);
   }
};

exports.PostNewCommentAmigo = async (req, res, next) => {
   const description = req.body.YourPostComment;
   const postId = req.body.PostId;

   try {
      const result = await Comentarios.create({
         description: description,
         postId: postId,
         usuarioId: req.user.id,
      });
      res.redirect("/amigos");
   } catch (error) {
      console.log(error);
   }
};
exports.PostReplyCommentAmigo = async (req, res, next) => {
   const description = req.body.Comentario;
   const comentarioId = req.body.ComentarioId;
   const postId = req.body.PostId;

   try {
      const result = await Respuestas.create({
         description: description,
         comentarioId: comentarioId,
         postId: postId,
         usuarioId: req.user.id,
      });
      res.redirect("/amigos");
   } catch (error) {
      console.log(error);
   }
};
exports.GetAddAmigo = async (req, res, next) => {
   res.render("amigos/add-amigo", { amigosActive: true, pageTitle: "Añadir amigos" });
};

exports.PostSearchAmigo = async (req, res, next) => {
   const username = req.body.Search;
   if (username === "" || username === null || username === undefined) {
      return res.render("amigos/add-amigo");
   }

   const usuariosIds = [];

   let result = await Usuarios.findAll({
      where: { nombre_user: username, id: { [Op.ne]: req.user.id } },
   });
   const usuarios = result.map((result) => result.dataValues);
   result = await Amigos.findAll({ where: { usuarioId: req.user.id } });
   let amigos = result.map((result) => result.dataValues);

   usuarios.forEach((usuario) => {
      let userId = usuario.id;
      amigos.forEach((amigo) => {
         if (userId === amigo.usuarioAmigoId) {
            usuario.sonAmigos = true;
         }
      });
      usuariosIds.push(usuario.id);
   });
   result = await Notificaciones.findAll({
      where: { usuarioId: req.user.id, usuarioSolicitadoId: usuariosIds },
   });
   const notificaciones = result.map((result) => result.dataValues);
   res.render("amigos/add-amigo", {
      pageTitle: "",
      searchMode: true,
      nameSearch: username,
      usuarios: usuarios,
      solicitudEnviada: notificaciones.length > 0,
      usuarioEncontrado: usuarios.length > 0,
      buscando: username.length > 0,
      amigosActive: true,
      pageTitle: "Buscar amigos",
   });
};

exports.PostAddAmigo = async (req, res, next) => {
   const amigoAgregar = req.body.UsuarioId;

   try {
      await Notificaciones.create({
         usuarioSolicitadoId: amigoAgregar,
         usuarioId: req.user.id,
      });
      res.redirect("add-amigo");
   } catch (error) {
      console.log(error);
   }
};
exports.PostDeleteAmigo = async (req, res, next) => {
   const id = req.body.AmigoId;
   result = await Amigos.destroy({ where: { usuarioId: id } });
   result = await Amigos.destroy({ where: { usuarioAmigoId: id } });
   return res.redirect("/amigos");
};
