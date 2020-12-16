// Requiring necessary npm packages
const express = require("express");
const exphbs = require("express-handlebars");
// const router = express.Router();

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");


const app = express();

//render static pages in public folder
app.use(express.static("public"));

//configuring middleware needed for authentication
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


require("./controller/app-controller.js")(app)

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
