const db = require("../models");
const passport = require("../config/passport");
const mbxGeocodig = require('@mapbox/mapbox-sdk/services/geocoding')
const mapToken = process.env.MAPBOX_TOKEN;
const geoCoder = mbxGeocodig({accessToken: mapToken});

module.exports = function(app) {

  // GET route for getting all of the sightings
  // app.get("/api/sightings", function(req, res) {
  //   db.Sighting.findAll({}).then(function(data) {
  //     res.json(data);
  //   })
  // });

  // GET route for getting all of the sightings near a city
  // app.get("/api/sightings/:location", function(req, res) {
  //   db.Sighting.findAll({
  //       city: req.params.city
  //   }).then(function(data) {
  //     res.json(data);
  //   })
  // });

  // GET route for getting all of the sightings for a particular whale
  // app.get("/api/sightings/:whale", function(req, res) {
  //   db.Sighting.findAll({
  //       whaleType: req.params.whaleType
  //   }).then(function(data) {
  //     res.json(data);
  //   })
  // });

  // POST route for saving a new sighting
  app.post("/api/sightings", function(req, res) {
    console.log("Making new post! ", req.body);
    console.log(req.body)
    db.Sighting.create(      
      req.body
    ).then(function(data) {
      res.json(data);
      fetchSubscribers(data);
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

  //POST route for loggin in a known user
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    console.log("Trying to login!!!!");
    res.json(req.user);
  });

  // GET route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // GET route for all user data
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // POST route for saving a new user
  app.post("/api/signup", function(req, res) {
    console.log("Creating new user! ", req.body);
    db.User.create(
      req.body
    ).then(function() {
      res.redirect(307, "/api/login");
    })
    .catch(function(err) {
      console.log(err);
      res.status(401).json(err);
    });
  });

  function fetchSubscribers(sighting) {
    let msg = `
      A whale has been sighted!

      Log-in to www.PNWWhalewatch.com to see where
    `;

    // Testing hardcoded values
    let nums = '12064120323';
    notifySubscribers(nums, msg);
    
    //DB call for list of subscribers
    db.User.findAll({
      where: {
        receiveNotification: true
      }
    }).then(function(data) {
      console.log("Users to be notified: ", data);
      // data.forEach(element => {
      //   console.log("About to message ", element);
        // notifySubscribers(data, msg);
      // });
    })
  };

  function notifySubscribers(num, msg) {
    //Foreach subscriber, send text;
    let params = {
      Message: msg,
      PhoneNumber: '+' + num,
      MessageAttributes: {
          'AWS.SNS.SMS.SenderID': {
              'DataType': 'String',
              'StringValue': "PNW-Whale-Watchers"
          }
      }
    };
    const publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();
    publishTextPromise.then(
      function (data) {
        console.log(`SNS Successful! ${data}`);
      }
    ).catch(
      function (err) {
          console.log(`An SNS error has occured: ${err}`);
      }
    )
  };
};