const express = require("express");
const hbs = require("express-handlebars");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static("public"));

app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "default",
    layoutsDir: __dirname + "/views/layouts/"
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

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
