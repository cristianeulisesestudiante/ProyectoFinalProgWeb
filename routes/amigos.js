const express = require("express");
const router = express.Router();
const amigosController = require("../controllers/AmigosController");
const isNotAuth = require("../middleware/isNotAuth");

router.get("/amigos", isNotAuth, amigosController.GetAmigosPost);
router.post(
  "/reply-comment-friend",
  isNotAuth,
  amigosController.PostReplyComment
);
router.post("/new-comment", isNotAuth, amigosController.PostNewCommentAmigo);
router.post("/reply-post-amigo", isNotAuth, amigosController.PostReplyCommentAmigo);
router.post("/delete-amigo", isNotAuth, amigosController.PostDeleteAmigo);
router.get("/add-amigo", isNotAuth, amigosController.GetAddAmigo);
router.post("/search-amigo", isNotAuth, amigosController.PostSearchAmigo);
router.post("/add-amigo", isNotAuth, amigosController.PostAddAmigo);
module.exports = router;
