const express = require("express");
const router = express.Router();

// Import the models
const db = require("../models");

module.exports = function(app) {
  router.get("/", function(req, res) {
    db.sighting.all(function(data) {
      let hbsObject = {
        sightings: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });

}