// Require necessary packages and files
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using a username
  {
    usernameField: "name",
  },
  function(name, password, done) {
    // When a user tries to sign in this code runs
    db.Parent.findOne({
      where: {
        name: name
      }
    }).then(function(dbParent) {
      // console.log("In passport");
      // If there's no user with the given email
      if (!dbParent) {
        return done(null, false, {
          message: "Invalid name."
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbParent.validPassword(password)) {
        return done(null, false, {
          message: "Invalid password."
        });
      }
      // If none of the above, return the user
      return done(null, dbParent);
    });
  }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(parent, cb) {
  cb(null, parent);
});
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
// Exporting our configured passport
module.exports = passport;