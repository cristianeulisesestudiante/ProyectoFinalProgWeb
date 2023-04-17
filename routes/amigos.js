const express = require("express");
const router = express.Router();
const amigosController = require("../controllers/AmigosController");

router.get("/amigos", amigosController.GetAmigosPost);
router.post("/reply-comment-friend", amigosController.PostReplyComment);
router.post("/new-comment", amigosController.PostNewComment);
router.post("/delete-amigo", amigosController.PostDeleteAmigo);
router.get("/add-amigo", amigosController.GetAddAmigo);
router.post("/search-amigo", amigosController.PostSearchAmigo);
router.post("/add-amigo", amigosController.PostAddAmigo);
// router.post("/delete-post", homeController.PostDeletePost);
// router.get("/create-post", homeController.GetCreatePost);
// router.post("/create-post", homeController.PostCreatePost);
// router.post("/reply-comment", homeController.PostReplyComment);
// router.post("/comment-your-post", homeController.PostCommentYourPost);
// router.get("/edit-post/:postId", homeController.GetEditPost);
// router.post("/edit-post", homeController.PostEditPost);
module.exports = router;
