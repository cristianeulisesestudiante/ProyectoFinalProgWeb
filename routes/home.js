const express = require("express");
const router = express.Router();
const homeController = require("../controllers/HomeController");

router.get("/", homeController.GetPost);
router.get("/create-post", homeController.GetCreatePost);
router.post("/create-post", homeController.PostCreatePost);
router.post("/reply-comment", homeController.PostReplyComment);
router.post("/comment-your-post", homeController.PostCommentYourPost);
router.get("/edit-post/:postId", homeController.GetEditPost);
router.post("/edit-post", homeController.PostEditPost);
router.post("/delete-post", homeController.PostDeletePost);
module.exports = router;
