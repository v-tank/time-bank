var db = require("../models");
var passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  app.get("/", function (req, res) {
    // If the parent already has an account send them to the members page
    if (req.user) {
      res.redirect("/profile");
    }
    res.render("index")
  });

  app.get("/login", function (req, res) {

    // If the user already has an account send them to the profile page
    // res.redirect("/profile");
    res.render("index");
  });

  app.get("/profile", isAuthenticated, function (req, res) {
    // console.log(res);
    res.render("profile");
  });

  app.post("/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the profile page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.render("profile", { name: req.body.name });
  });

  app.post("/signup", function (req, res) {
    console.log(req.body);
    db.Parent.create({
      name: req.body.username,
      password: req.body.password
    }).then(function (user) {
      console.log("in here");
      res.render("profile", {
        name: user.name
      });
    }).catch(function (err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/parent_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's name and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        name: req.user.name,
        id: req.parent.id
      });
    }
  });
}