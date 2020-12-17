const db = require("../models");


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

  function fetchSubscribers(sighting) {
    let msg = `
      A whale has been sighted!

      ${json.strify(data)}
    `;

    // Testing hardcoded values
    // let nums = await ['12064120323'];
    // notifySubscribers(nums, msg);
    
    //DB call for list of subscribers
    db.User.findAll({
      where: {
        receiveNotification: true
      }
    }).then(function(data) {
      console.log("User data fron DB: ", data);
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