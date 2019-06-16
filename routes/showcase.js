const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

router.get("/", (req, res) => {
  res.render("showcase", {
    layout: "showcase",
    title: "Welcome to the Social Network"
  });
});

router.get("/feed", ensureAuthenticated, (req, res) => {
  res.render("feed", { title: "Feed", name: req.user.name });
});

module.exports = router;
