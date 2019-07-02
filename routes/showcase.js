const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

const Profile = require("../models/Profiles");
const Post = require("../models/Posts");
const User = require("../models/Users");

router.get("/", (req, res) => {
  res.render("showcase", {
    layout: "showcase",
    title: "Twatter. It's what's happening."
  });
});

router.get("/feed", ensureAuthenticated, async (req, res) => {
  const posts = await Post.find().sort({ date: -1 });

  res.render("feed", {
    title: "Feed / Twatter",
    name: req.user.name,
    post: posts
  });
});

router.post("/feed", ensureAuthenticated, (req, res) => {
  const { text } = req.body;
  const { name, _id } = req.user;
  const postedBy = _id;

  function isEmpty(str) {
    return !str.replace(/\s+/, "").length;
  }

  if (isEmpty(text) || text == "") {
    return res.redirect("back");
  }

  const userPost = new Post({
    postedBy,
    text,
    name
  });

  userPost
    .save()
    .then(user => {
      req.flash("success_msg", "Created Post");
    })
    .catch(err => {
      console.log(err);
    });
  res.redirect("back");
});

router.get("/profile", ensureAuthenticated, (req, res) => {
  res.render("profile", {
    title: `${req.user.name}'s profile`,
    user: req.user
  });
});

module.exports = router;
