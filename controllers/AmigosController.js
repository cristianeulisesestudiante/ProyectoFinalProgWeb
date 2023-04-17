const Post = require("../models/Posts");
const Comentarios = require("../models/Comentarios");
const Respuestas = require("../models/Respuestas");
const Amigos = require("../models/Amigos");
const Usuarios = require("../models/Usuariossss");
const Notificaciones = require("../models/Notificaciones");

exports.GetAmigosPost = async (req, res, next) => {
const set = new Set();
   let amigosIds = [];
   const id = 1;

   try {
      let result = await Amigos.findAll();
      let amigos = result.map((result) => result.dataValues);
      amigos.forEach((element) => {
         if (element.usuarioId === id && element.usuarioAmigoId !== id) {
            set.add(element.usuarioAmigoId);
         } else if (element.usuarioAmigoId === id && element.usuarioId !== id) {
            set.add(element.usuarioId);
         }
      });
      amigosIds = [...set];
      console.log(amigosIds);
      result = await Post.findAll({ where: { usuarioId: amigosIds } });
      let posts = result.map((result) => result.dataValues);
      posts = posts.reverse();
      result = await Comentarios.findAll();
      const comments = result.map((result) => result.dataValues);
      result = await Respuestas.findAll();
      const respuestas = result.map((result) => result.dataValues);
      result = await Usuarios.findAll({ where: { id: amigosIds } });
      const usuarios = result.map((result) => result.dataValues);
      res.render("amigos/amigos-post", {
         posts: posts,
         comments: comments,
         respuestas: respuestas,
         usuarios: usuarios,
      });
   } catch (error) {
      console.log(error);
   }
};

exports.PostReplyComment = async (req, res, next) => {
   const description = req.body.Comentario;
   const comentarioId = req.body.ComentarioId;
   const postId = req.body.PostId;
   // console.log(comentarioId);
   // console.log(postId);

   // const image = req.file;
   // console.log(image.path);
   // console.log(description);

   try {
      // const comentario = await Comentarios.create({description: "UN COMENTARIO", postId: 3})
      const result = await Respuestas.create({
         description: description,
         comentarioId: comentarioId,
         postId: postId,
      });
      res.redirect("/amigos");
   } catch (error) {
      console.log(error);
   }
   // Post.create({ description: name, imagePath: email })
   //    .then((result) => {
   //       return res.redirect("/authors");
   //    })
   //    .catch((err) => {
   //       console.log(err);
   //    });
};

exports.PostNewComment = async (req, res, next) => {
   const description = req.body.YourPostComment;
   const postId = req.body.PostId;
   console.log(postId);

   try {
      // const comentario = await Comentarios.create({description: "UN COMENTARIO", postId: 3})
      const result = await Comentarios.create({ description: description, postId: postId });
      res.redirect("/amigos");
   } catch (error) {
      console.log(error);
   }
   // Post.create({ description: name, imagePath: email })
   //    .then((result) => {
   //       return res.redirect("/authors");
   //    })
   //    .catch((err) => {
   //       console.log(err);
   //    });
};

exports.GetAddAmigo = async (req, res, next) => {
   res.render("amigos/add-amigo");
};

exports.PostSearchAmigo = async (req, res, next) => {
   const username = req.body.Search;
   if (username === "" || username === null || username === undefined) {
      return res.redirect("/");
   }

   const result = await Usuarios.findAll({ where: { nombre_user: username } });
   const usuarios =  result.map((result) => result.dataValues);;
   res.render("amigos/add-amigo", {
      pageTitle: "Search Pokemon",
      searchMode: true,
      nameSearch: username,
      usuarios: usuarios
   });
};

exports.PostAddAmigo = async (req, res, next) => {
    const amigoAgregar = req.body.UsuarioId;
    // console.log(image.path);
    console.log(amigoAgregar);
    // console.log(description);
 
    try {
       const amigo = await Notificaciones.create({usuarioSolicitadoId: amigoAgregar, usuarioId: 1})
    //    const result = await Post.create({ description: description, imagePath: "/" + image.path });
       res.redirect("/");
    } catch (error) {
       console.log(error);
    }
 };

exports.PostDeleteAmigo = async (req, res, next) => {
   const id = req.body.AmigoId;
   let result = await Usuarios.findOne({ where: { id: id } });
   const usuario = result.dataValues;
   console.log(usuario);
   result = await Amigos.destroy({ where: { usuarioId: id } });
   result = await Amigos.destroy({ where: { usuarioAmigoId: id } });
   return res.redirect("/");
};
