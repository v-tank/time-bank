var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function (user_id, done) {
  done(null, user_id);
});

module.exports = passport;