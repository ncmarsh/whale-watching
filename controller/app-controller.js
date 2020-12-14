// const express = require("express");
// const router = express.Router();

// // Import the models
const db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    // db.Sighting.findAll(function(data) {
    //   let hbsObject = {
    //     sightings: data
    //   };
    //   console.log(hbsObject);
    //   res.render("index", hbsObject);
    // });
    // db.Sighting.findAll({})
    //   .then(function(data) {
    //     let hbsObject = {
    //       sightings: data
    //     };
    //   });
    res.render('landing')
  });

}