// Import the models
const db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    db.sighting.findAll(function(data) {
      let hbsObject = {
        sightings: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });

}