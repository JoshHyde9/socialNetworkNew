const express = require("express");
const hbs = require("express-handlebars");
const path = require("path");

const app = express();
const port = 3000;

// Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
