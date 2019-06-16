const express = require("express");
const hbs = require("express-handlebars");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");

require("./config/passport")(passport);

const app = express();
const port = 3000;

const db = require("./config/keys").MongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongoose DB");
  })
  .catch(err => console.log(err));

app.use(express.static("public"));

app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "default",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/"
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// Body parser
app.use(express.urlencoded({ extended: false }));

// Session
app.use(
  session({
    secret: "yanan",
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

// Routes
app.use("/", require("./routes/showcase"));
app.use("/users", require("./routes/users"));

// Page error handling
app.use((req, res) => {
  res.status(404);

  if (req.accepts("html")) {
    return res.render("error", { title: "Page Not Found" });
  }
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
