const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

const Post = require("../models/Posts");

router.get("/:id", ensureAuthenticated, async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ msg: "Post not found!" });
  }

  res.render("post", {
    title: `${post.name} on Twatter: "${post.text}"`,
    post: post
  });
});

module.exports = router;
