const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
  {
    usernameField: "userName"
  },
    function(username, password, done) {
      // When a user tries to sign in this code runs and ckecks if a user exists with this username
      
      console.log(username,password);
        db.User.findOne({  
           where: {
            userName: username      
           }                    
        })
        .then(user => {
            //If a user is not found with the entered username
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            //if password is not valid
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            //If username and password are correct, return the user
            return done(null, user);
        })        
    }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
