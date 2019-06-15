const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login", { title: "Login to an existing account" });
});

router.get("/register", (req, res) => {
  res.render("register", { title: "Register an account" });
});

module.exports = router;
