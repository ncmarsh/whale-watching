// Requiring necessary npm packages
const express = require("express");
const exphbs = require("express-handlebars");
const router = express.Router();
const session = require("express-session");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");
const passport = require("./config/passport");

const app = express();

//render static pages in public folder
app.use(express.static("public"));

//configuring middleware needed for authentication
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//set handlebars as the view engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.user = req.user; // This is the important line

  next();
});

require("./controller/app-controller.js")(app)
require("./controller/api-controller.js")(app)

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
