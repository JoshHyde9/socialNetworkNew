const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login", { title: "Login to an existing account" });
});

router.get("/register", (req, res) => {
  res.render("register", { title: "Register an account" });
});

router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in al fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters long" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    res.send("success");
  }
});

module.exports = router;
