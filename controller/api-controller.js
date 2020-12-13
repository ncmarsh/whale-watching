const db = require("../models");


module.exports = function(app) {

  // GET route for getting all of the sightings
  app.get("/api/sightings", function(req, res) {
    db.Sighting.findAll({}).then(function(data) {
      res.json(data);
    })
  });

  // GET route for getting all of the sightings near a city
  app.get("/api/sightings/:city", function(req, res) {
    db.Sighting.findAll({
        city: req.params.city
    }).then(function(data) {
      res.json(data);
    })
  });

  // POST route for saving a new sighting
  app.post("/api/sightings", function(req, res) {
    db.Sighting.create(
      req.body
    ).then(function(data) {
      res.json(data);
    })
  });

  // PUT route for editing a existing sighting
  app.put("/api/sightings", function(req, res) {
    db.Sighting.update(
      req.body, {
        where: {
          id: req.body.id
          }
        }
    ).then(function(data) {
      res.json(data);
    })
  });

  // DELETE route for deleting sightings.
  app.delete("/api/sightings/:id", function(req, res) {
    db.Sighting.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(data) {
      res.json(data);
    })
  });
}