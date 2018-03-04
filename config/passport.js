var Parent = require("../models/Parent.js");
var localStrategy = require("passport-local").Strategy;

module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		done(null, user.id)
	});

	passport.deserializeUser(function(id, done) {
		Parent.findbyId(id, function(err, user) {
			return done(err, user);
		});
	});

	passport.use("local-signup", new localStrategy({
		usernameField: "name", 
		passwordField: "password",
		passReqToCallback: true
	},function(req, name, password, done) {
		process.nextTick(function() {
			Parent.findOne({"local.name": name}, function(err, user) {
				if (err) {
					return done(err);
				}
				if (user) {
					return done(null, false, req.flash("signupmessage", "user already exists"))
				} else {
					var newUser = new Parent();
					newUser.local.name = name;
					newUser.local.password = newUser.generateHash(password);
					newUser.save(function(err) {
						if (err) {
							throw err;
						} else {
							return done(newUser);
						}
					});
				}
			});
		});
	}));
};