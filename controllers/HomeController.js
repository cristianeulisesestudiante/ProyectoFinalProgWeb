const fs = require("fs");
const pathAllImage = require("../images/path");
const Post = require("../models/Posts");
const Comentarios = require("../models/Comentarios");
const Respuestas = require("../models/Respuestas");
const Usuarios = require("../models/Usuarios");

exports.GetPost = async (req, res, next) => {
   try {
      const usuario = await Usuarios.findOne({ where: { id: req.user.id } });
      let result = await Post.findAll({ where: { usuarioId: req.user.id } });
      const posts = result.map((result) => result.dataValues);

      result = await Comentarios.findAll({ include: [{ model: Usuarios }] });
      const comments = result.map((result) => result.dataValues);
      result = await Respuestas.findAll({ include: [{ model: Usuarios }] });
      const respuestas = result.map((result) => result.dataValues);

      res.render("home/post", {
         posts: posts.reverse(),
         package: "Home",
         comments: comments,
         respuestas: respuestas,
         usuario: usuario.dataValues,
         hayPublicaciones: posts.length > 0,
         homeActive: true,
         pageTitle: "Inicio",
      });
   } catch (error) {
      console.log(error);
   }
};

exports.GetCreatePost = (req, res, next) => {
   res.render("home/save-post", { homeActive: true, pageTitle: "Crear publicación" });
};

exports.PostCreatePost = async (req, res, next) => {
   const description = req.body.Description;
   let image = req.file;
   if (image === "" || image === undefined || image === null) image = "";
   else image = "/" + image.path;

   try {
      const result = await Post.create({
         description: description,
         imagePath: image,
         usuarioId: req.user.id,
      });
      res.redirect("/home");
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
      res.redirect("/home");
   } catch (error) {
      console.log(error);
   }
};

exports.PostCommentYourPost = async (req, res, next) => {
   const description = req.body.YourPostComment;
   const postId = req.body.PostId;

   try {
      const result = await Comentarios.create({
         description: description,
         postId: postId,
         usuarioId: req.user.id,
      });
      res.redirect("/home");
   } catch (error) {
      console.log(error);
   }
};

exports.GetEditPost = async (req, res, next) => {
   const id = req.params.postId;
   const edit = req.query.edit;
   const result = await Post.findOne({
      where: { id: id, usuarioId: req.user.id },
   });
   const post = result.dataValues;
   if (!edit) return res.redirect("/home");
   res.render("home/save-post", {
      post: post,
      editMode: true,
      homeActive: true,
      pageTitle: "Editar publicación",
   });
};

exports.PostEditPost = async (req, res, next) => {
   try {
      const description = req.body.Description;
      const image = req.file;
      const id = req.body.PostId;
      let result = await Post.findOne({
         where: { id: id, usuarioId: req.user.id },
      });
      const post = result.dataValues;
      if (!post) return res.redirect("/home");
      const imagePath = image ? "/" + image.path : post.imagePath;
      result = await Post.update(
         { description: description, imagePath: imagePath },
         { where: { id: id, usuarioId: req.user.id } }
      );
      return res.redirect("/home");
   } catch (error) {
      console.log(error);
   }
};

exports.PostDeletePost = async (req, res, next) => {
   const id = req.body.PostId;
   let result = await Post.findOne({
      where: { id: id, usuarioId: req.user.id },
   });
   const post = result.dataValues;
   const splitPath = post.imagePath.split("/");
   const path = pathAllImage.Path().join(splitPath[1]);
   fs.unlink(path, (err) => {
      if (err) {
         console.error(err);
      }
   });
   result = await Post.destroy({ where: { id: id, usuarioId: req.user.id } });
   return res.redirect("/home");
};
