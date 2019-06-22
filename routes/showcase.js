const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

const Profile = require("../models/Profiles");
const Post = require("../models/Posts");
const User = require("../models/Users");

router.get("/", (req, res) => {
  res.render("showcase", {
    layout: "showcase",
    title: "Welcome to the Social Network"
  });
});

router.get("/feed", ensureAuthenticated, (req, res) => {
  res.render("feed", { title: "Feed", name: req.user.name });
});

router.post("/feed", (req, res) => {
  const { text } = req.body;
  const { name, email } = req.user;

  const userPost = new Post({
    text,
    name,
    email
  });

  userPost
    .save()
    .then(user => {
      req.flash("success_msg", "Created Post");
      res.status(200);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/profile", ensureAuthenticated, (req, res) => {
  res.render("profile", {
    title: `${req.user.name}'s profile`,
    user: req.user
  });
});

module.exports = router;
