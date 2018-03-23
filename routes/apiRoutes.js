// Require the necessary files and packages
var db = require("../models");
var passport = require("passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var expressValidator = require("express-validator");
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcryptjs");

module.exports = function (app) {

  app.get("/", function (req, res) {
    res.render("login", {title: "Login"}); // Render the index page upon load to prompt user to log in
  });

  app.post('/login', passport.authenticate('local', { failureRedirect: '/' }), function (req, res) {
    db.Parent.findOne({
      where: {
        username: req.body.username
      }
    }).then(function (results) {
      // res.json(results);
      // console.log(results.id);

      console.log("Login info: " + JSON.stringify(req.user));
      res.redirect("/profile/" + results.id);
    })
    // console.log(res.body);
  });

  app.get("/logout", function (req, res) {
    req.logout();
    req.session.destroy();

    res.redirect("/"); // Render the index page upon load to prompt user to log in
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
        const user_id = user.id;

        req.login(user_id, function(err) {
          res.redirect("/profile/" + user_id);
        })

        // res.render("register", {title: "Registration Complete."})
      }).catch(function (err) {
        console.log(err.errors[0].message);
        res.render("register", {
          title: `${err.errors[0].message}`
        });
      });
    }
  });

  app.post("/addChild", function (req, res) {
    console.log(req.user);
    // console.log(req.body.array);
    var array = req.body.array;
    for (var i = 0; i < array.length; i++) {
      console.log("Task Name: " + array[i].taskName + "; Weight: " + array[i].task_weight)
    }

    db.Child.create({
      name: req.body.name,
      ParentId: req.user.user_id
    }).then(function(results) {
      // console.log(results);
      db.Child.findOne({
        where: {
          id: results.id
        }
      }).then(function(results) {
        for (var i = 0; i < array.length; i++) {
          db.Task.create({
            name: array[i].taskName,
            task_weight: array[i].task_weight,
            ChildId: results.id
          })
        }
      })
    })
  });

  app.get("/children", function (req, res) {
    if (req.user) {
      db.Child.findAll({
        where: {
          ParentId: req.user.user_id
        }
      }).then(function(results){
        res.json(results);
      })
    }
  });


  app.get("/faq", function (req, res) {
    res.render("faq"); // Render the index page upon load to prompt user to log in
  });

  app.get("/profile/:id", isAuthenticated(), function (req, res) {
    res.render("profile", {name: req.user.name, id: req.user.user_id}); // Render the profile page upon load to prompt user to log in
  });

  passport.serializeUser(function (user_id, done) {
    done(null, user_id);
  });

  passport.deserializeUser(function (user_id, done) {
    done(null, user_id);
  });

  passport.use(new LocalStrategy(
    {
      usernameField: "username",
    },
    function (username, pass, done) {
      // console.log(username);
      // console.log(pass);

      db.Parent.findOne({
        where: {
          username: username
          }
        }).then(function(dbParent) {
          // console.log("In here");
          // console.log(dbParent);

          if (!dbParent) {
            return done(null, false, {message: 'Incorrect username.'});
          }
          else{
            const hash = dbParent.password;

            bcrypt.compare(pass, hash, function (err, response) {
              if (response) {
                // console.log("Password matched.");
                return done(null, { user_id: dbParent.id, name: dbParent.name });
              } else {
                // console.log("Incorrect password.");
                return done(null, false);
              }
            })
        }
      });
    }
  ));

  function isAuthenticated() {
    return (req, res, next) => {
      // console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

      if (req.isAuthenticated()) return next();
      res.redirect('/')
    }
  }
}
