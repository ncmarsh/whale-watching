// Import the models
const db = require("../models");

module.exports = function(app) {
  //Serve home handlebars page & required data
  app.get("/", function(req, res) {
    res.render("index");

  });

  //Serve Resources handlebars page
  app.get("/resources", function(req, res) {
      res.render("resources");
    });

  //Serve home handlebars page & required data
  app.get("/sightings", function(req, res) {
    db.Sighting.findAll({
      include: [db.User]
    }).then(function(data) {
      let arr = [];
      data.forEach(e => {
        arr.push({
          createdAt: e.dataValues.createdAt,
          city: e.dataValues.city,
          description: e.dataValues.description,
          userName: e.dataValues.User.userName,
          userId: e.dataValues.UserId
        })
      });
      let hbsObject = {
        sighting: arr
      }
      res.render("sightings", hbsObject);
    });
  });

  // GET route for getting all of the sightings near a city
  app.get("/sightings/city/:location", function(req, res) {
    db.Sighting.findAll({
        city: req.params.location
    }).then(function(data) {
      let hbsObject = {
        data: data 
      };
      res.render("sightings", hbsObject);
    })
  });

  // GET route for getting all of the sightings for a particular whale
  app.get("/sightings/whale/:whaleType", function(req, res) {
    db.Sighting.findAll({
        whale: req.params.whaleType
    }).then(function(data) {
      let hbsObject = {
        data: data 
      };
      res.render("sightings", hbsObject);
    })
  });
}