const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

const Post = require("../models/Posts");
const User = require("../models/Users");

router.get("/:id", ensureAuthenticated, async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ msg: "Post not found!" });
  }

  res.render("post", {
    title: `${post.name} on Twatter: "${post.text}"`,
    post: post,
    comment: post.comments
  });
});

router.post("/:id", ensureAuthenticated, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  const post = await Post.findById(req.params.id);

  const newComment = {
    text: req.body.text,
    postedBy: req.user.id,
    name: user.name
  };

  post.comments.unshift(newComment);

  await post.save();
  res.redirect("back");
});

module.exports = router;
