// Import the models
const db = require("../models");

module.exports = function(app) {
  //Serve home handlebars page & required data
  app.get("/", function(req, res) {
    let hbsObject = {
      data: null //any data needed for page?
    };
      res.render("index", hbsObject);
  });

  //Serve Resources handlebars page
  app.get("/resources", function(req, res) {
    let hbsObject = {
      data: null //any data needed for page?
    };
      res.render("resources", hbsObject);
    });

  //Serve home handlebars page & required data
  app.get("/sightings", function(req, res) {
    db.Sighting.findAll({}).then(function(data) {
      let hbsObject = {
        data: null 
      };
      res.render("sightings", hbsObject);
    });
  });

}