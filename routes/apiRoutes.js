// Require the necessary files and packages
var db = require("../models");
// var passport = require("../config/passport");
// var isAuthenticated = require("../config/middleware/isAuthenticated");
var expressValidator = require("express-validator");

module.exports = function (app) {

  app.get("/", function (req, res) {
    res.render("login", {title: "Login"}); // Render the index page upon load to prompt user to log in
  });

  app.get("/register", function (req, res) {
    res.render("register", {title: "Register"}); // Render the index page upon load to prompt user to log in
  });

  app.post("/register", function (req, res) {
    req.checkBody('name', 'Name field cannot be empty.').notEmpty();
    req.checkBody('username', 'Username field cannot be empty.').notEmpty();
    req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
    req.checkBody('pass', 'Password must be between 8-100 characters long.').len(8, 100);
    req.checkBody("pass", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
    req.checkBody('confirmPass', 'Passwords do not match, please try again.').equals(req.body.pass);

    // Additional validation to ensure username is alphanumeric with underscores and dashes
    req.checkBody('username', 'Username can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');

    const errors = req.validationErrors();

    if (errors) {
      console.log(`errors: ${JSON.stringify(errors)}`);
      res.render("register", {
        title: "Registration Error.",
        errors: errors});
    } else {
      db.Parent.create({
        name: req.body.name,
        username: req.body.username,
        password: req.body.pass
      }).then(function (user) {
        res.render("register", {title: "Registration Complete."})
      }).catch(function (err) {
        console.log(err.errors[0].message);
        res.render("register", {
          title: `${err.errors[0].message}`
        });
      });
    }
  });
}
