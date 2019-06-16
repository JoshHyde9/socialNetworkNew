const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("showcase", {
    layout: "showcase",
    title: "Welcome to the Social Network"
  });
});

router.get("/feed", (req, res) => {
  res.render("feed", { title: "Feed" });
});

module.exports = router;
