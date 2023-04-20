const express = require("express");
const router = express.Router();
const homeController = require("../controllers/HomeController");
const isNotAuth = require("../middleware/isNotAuth");

router.get("/home", isNotAuth, homeController.GetPost);
router.get("/create-post", isNotAuth, homeController.GetCreatePost);
router.post("/create-post", isNotAuth, homeController.PostCreatePost);
router.post("/reply-comment", isNotAuth, homeController.PostReplyComment);
router.post("/comment-your-post", isNotAuth, homeController.PostCommentYourPost);
router.get("/edit-post/:postId", isNotAuth, homeController.GetEditPost);
router.post("/edit-post", isNotAuth, homeController.PostEditPost);
router.post("/delete-post", isNotAuth, homeController.PostDeletePost);
module.exports = router;
