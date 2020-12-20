const db = require("../models");
const passport = require("../config/passport");
const AWS = require('aws-sdk');
const multer = require("multer");

module.exports = function(app) {
  var storage = multer.memoryStorage();
  var upload = multer({ storage: storage });

  // POST route for saving a new sighting
  app.post("/api/sightings", function(req, res) {
    console.log("Making new post! ", req.body);
    console.log(req.body)
    db.Sighting.create(      
      req.body
    ).then(function(data) {
      res.json(data);
      // fetchSubscribers(data); //TODO uncomment when deployed final
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
    db.Sighting.findAll({
      where: {
        id: req.params.id
      }
  }).then(function(data){
    userId =  data[0].dataValues.UserId;
    console.log(data);
    if (userId ===req.user.id){
      db.Sighting.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(data) {
        res.json(data);
      })
    }
    else{
      console.log(userId);
      console.log(req.user.id);
      res.status(401).json(data);
    }
  });
})

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
      res.json({});
    } else {
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

// route to upload a pdf document file
// In upload.single("file") - the name inside the single-quote is the name of the field that is going to be uploaded.
app.post("/api/upload", upload.single("file"), function(req, res) {
  const file = req.file;
  const s3FileURL = process.env.AWS_S3_Uploaded_File_URL_LINK;

  let s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_REGION
  });

  //Where you want to store your file

  var params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read"
  };

  s3bucket.upload(params, function(err, data) {
    if (err) {
      res.status(500).json({ error: true, Message: err });
    } else {
      res.send({ data });
      var newFileUploaded = {
        description: req.body.description,
        fileLink: s3FileURL + file.originalname,
        s3_key: params.Key
      };
      console.log("Uploaded new file! ", newFileUploaded);
      // var document = new DOCUMENT(newFileUploaded);
      // document.save(function(error, newFile) {
      //   if (error) {
      //     throw error;
      //   }
      // });
    }
  });
});

  function fetchSubscribers(sighting) {
    let msg = `
      A whale has been sighted near ${sighting.city}! 

      www.PNWWhalewatch.com for details
    `;

    //DB call for list of subscribers
    db.User.findAll({
      where: {
        receiveNotification: true
      }
    }).then(function(data) {
      console.log("Users to be notified: ");
      data.forEach(element => {
        // console.log(`+1${element.phoneNumber}`, msg);
        notifySubscribers(`+1${element.phoneNumber}`, msg);
      });
    })
  };

  function notifySubscribers(num, msg) {
    //Foreach subscriber, send text;
    let params = {
      Message: msg,
      PhoneNumber: num,
      MessageAttributes: {
          'AWS.SNS.SMS.SenderID': {
              'DataType': 'String',
              'StringValue': "PNWWhaler"
          }
      }
    };
    const publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();
    publishTextPromise.catch(
      function (err) {
          console.log(`An SNS error has occured: ${err}`);
      }
    )
  };
};