const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("showcase", {
    layout: "showcase",
    title: "Welcome to the Social Network"
  });
});

module.exports = router;
