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
  // app.get("/sightings", function(req, res) {
  //   db.Sighting.findAll({}).then(function(data) {
  //     let hbsObject = {
  //       data: data 
  //     };
  //     res.render("sightings", hbsObject);
  //   });
  // });
  app.get("/sightings", function(req, res) {
    db.Sighting.findAll(
      {
      order: [
        ['id', 'DESC']
      ],
        include: [db.User]
      }
    ).then(function(data) {
      let username = "";
      let uid =0;
      if (req.user){
        username = req.user.userName;
        uid = req.user.id;
      }
      let arr = [];
      data.forEach(e => {
        arr.push({
          id : e.dataValues.id,
          createdAt: e.dataValues.createdAt,
          city: e.dataValues.city,
          description: e.dataValues.description,
          userName: e.dataValues.User.userName,
          userId: e.dataValues.UserId,
          whaleType: e.dataValues.whaleType,
          isAuthor: e.dataValues.UserId==uid,                  
          lat: e.dataValues.lat,
          lng: e.dataValues.lng,
          pictureName: e.dataValues.pictureName,
          pictureUrl: e.dataValues.pictureUrl,
          isAuthor: e.dataValues.UserId==uid
        })
      });
      
      let hbsObject = {
        sighting: arr,
        username: username
      }
      res.render("sightings", hbsObject);
      // res.render("resources");
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