const fs = require("fs");
const pathAllImage = require("../images/path");
const Post = require("../models/Posts");
const Comentarios = require("../models/Comentarios");
const Respuestas = require("../models/Respuestas");

exports.GetPost = async (req, res, next) => {
   // const arr = [
   //    { description: "this is a description of the post", imagePath: "images/1.jpg", comments: [{name: 'user1', comment: 'description'}, {name: 'user2', comment: 'description'}] },
   //    { description: "this is a description of the post", imagePath: "images/2.jpg", comments: [{name: 'user1', comment: 'description'}, {name: 'user2', comment: 'description'}] },
   //    { description: "this is a description of the post", imagePath: "images/3.jpg", comments: [{name: 'user1', comment: 'description'}, {name: 'user2', comment: 'description'}] },
   //    { description: "this is a description of the post", imagePath: "images/4.jpg", comments: [{name: 'user1', comment: 'description'}, {name: 'user2', comment: 'description'}] },
   //    { description: "this is a description of the post", imagePath: "images/5.jpg", comments: [{name: 'user1', comment: 'description'}, {name: 'user2', comment: 'description'}] },
   //    { description: "this is a description of the post", imagePath: "images/6.jpg", comments: [{name: 'user1', comment: 'description'}, {name: 'user2', comment: 'description'}] },
   //    { description: "this is a description of the post", imagePath: "images/7.jpg", comments: [{name: 'user1', comment: 'description'}, {name: 'user2', comment: 'description'}] },
   // ];
   const id = 1;
   try {
      let result = await Post.findAll({ where: { usuarioId: id } });
      let posts = result.map((result) => result.dataValues);
      posts = posts.reverse();
      result = await Comentarios.findAll();
      const comments = result.map((result) => result.dataValues);
      result = await Respuestas.findAll();
      const respuestas = result.map((result) => result.dataValues);
      // console.log(respuestas);
      // const comments = [{name: 'user1', comment: 'description'}, {name: 'user2', comment: 'description'}]
      // console.log(posts);
      res.render("home/post", {
         posts: posts,
         package: "Home",
         comments: comments,
         respuestas: respuestas,
      });
   } catch (error) {
      console.log(error);
   }
};

exports.GetCreatePost = (req, res, next) => {
   res.render("home/save-post");
};

exports.PostCreatePost = async (req, res, next) => {
   const description = req.body.Description;
   const image = req.file;
   // console.log(image.path);
   // console.log(description);

   try {
      // const comentario = await Comentarios.create({description: "UN COMENTARIO", postId: 3})
      const result = await Post.create({ description: description, imagePath: "/" + image.path });
      res.redirect("/");
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
      res.redirect("/");
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

exports.PostCommentYourPost = async (req, res, next) => {
   const description = req.body.YourPostComment;
   const postId = req.body.PostId;
   console.log(postId);

   try {
      // const comentario = await Comentarios.create({description: "UN COMENTARIO", postId: 3})
      const result = await Comentarios.create({ description: description, postId: postId });
      res.redirect("/");
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

exports.GetEditPost = async (req, res, next) => {
   const id = req.params.postId;
   const edit = req.query.edit;
   const result = await Post.findOne({ where: { id: id } });
   const post = result.dataValues;
   if (!edit) return res.redirect("/");
   res.render("home/save-post", { post: post, editMode: true });
};

exports.PostEditPost = async (req, res, next) => {
   try {
      const description = req.body.Description;
      const image = req.file;
      const id = req.body.PostId;
      let result = await Post.findOne({ where: { id: id } });
      const post = result.dataValues;
      if (!post) return res.redirect("/");
      const imagePath = image ? "/" + image.path : post.imagePath;
      result = await Post.update(
         { description: description, imagePath: imagePath },
         { where: { id: id } }
      );
      return res.redirect("/");
   } catch (error) {
      console.log(error);
   }
};

exports.PostDeletePost = async (req, res, next) => {
   const id = req.body.PostId;
   let result = await Post.findOne({ where: { id: id } });
   const post = result.dataValues;
   const splitPath = post.imagePath.split("/");
   const path = pathAllImage.Path().join(splitPath[1]);
   fs.unlink(path, (err) => {
      if (err) {
         console.error(err);
      }
   });
   result = await Post.destroy({ where: { id: id } });
   return res.redirect("/");
};
