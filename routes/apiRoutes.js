var db = require("../models");
var passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  app.get("/", function (req, res) {
    console.log("At the root");
    // If the parent already has an account send them to the members page
    // if (req.user) {
    //   res.redirect("/profile");
    // }
    res.render("index");
  });

  // app.get("/login", function (req, res) {

  //   // If the user already has an account send them to the profile page
  //   // res.redirect("/profile");
  //   res.render("index");
  // });

  app.get("/profile/:id", isAuthenticated, function (req, res) {
    res.render("profile", { id: req.params.id, user: req.user.name });
  });

  app.post("/addChild", function(req, res) {
    // console.log(req.user);
    console.log(req.body.array);

    db.Child.create({
      name: req.body.name,
      ParentId: req.user.id
    }).then(function(results) {
      // console.log(results);
      db.Child.findOne({
        where: {
          name: req.body.name
        }
      }).then(function (results) {
        // console.log(req.body.array);
        // console.log(results);
        db.Task.create({
          name: req.body.array[1],
          task_weight: req.body.exercise,
          ChildId: results.id
        })

        db.Task.create({
          name: req.body.array[2],
          task_weight: req.body.reading,
          ChildId: results.id
        })
        
      })
    });
  });

  app.post('/',
    passport.authenticate('local', { failureRedirect: '/' }), function (req, res) {
      db.Parent.findOne({
        where: {
          name: req.body.name
        }
      }).then(function(results) {
        // res.json(results);
        // console.log(results.id);
        res.redirect("/profile/" + results.id );
      })
      // console.log(res.body);
    });
    

  // app.post("/login", passport.authenticate("local"), { failureRedirect: '/' }), function (req, res) {
  //   // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
  //   // So we're sending the user back the route to the profile page because the redirect will happen on the front end
  //   // They won't get this or even be able to access this page if they aren't authed
  //   res.render("profile");
  // });

  app.post("/signup", function (req, res) {
    console.log(req.body);
    db.Parent.create({
      name: req.body.username,
      password: req.body.password
    }).then(function (user) {
      // console.log("in here");
      res.render("profile", {id: user.id});
    }).catch(function (err) {
      // console.log(err);
      // res.json(err);
      console.log(err.errors[0].message);
      res.render("index", { alert: err.errors[0].message });
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

  // app.get("/:id/addChild", function (req, res) {
  //   // console.log(req);
  //   res.render("addChild");

  // });

  // app.post("/addChild/:id", function (req, res) {
  //   console.log(req.body);
  //   console.log(req.params.id);
  //   // db.Child.create({
  //   //   name: req.body.name,
  //   //   foreignKey: 
  //   // })
  // });

  app.get("/children", function(req, res) {
    if (req.user) {
      db.Child.findAll({
        where: {
          ParentId: req.user.id
        }
      }).then(function (results) {
        res.json(results);
      });
    }
  });

  app.get("/earnIt/:id", function (req, res) {
    // console.log(req.params);

    // console.log("======================================");
    // console.log(req.body);

    db.Child.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      // console.log(result.name);
      res.render("earnIt", { id: req.params.id, name: result.name });
    });
  });

  app.put("/earnIt/:id", function (req, res) {
  db.Task.update({
      banked_time: "20",
    },
    {
      where: {
        ChildId: req.params.id,
        name: "exercise"
      }
    }).then(function (results) {
      res.json(results);
    });
  });

  app.get("/spendIt", function (req, res) {
    res.render("spendIt");
  });

  app.get("/report/:id", function (req, res) {
    //grapping the data from Tasks table, then show it on the chart
    db.Task.findAll({
      where: {
        ChildId: req.params.id
      }
    }).then(function (dbTask) {
      //this total productive time for the kid
      var total = 0;
      //create an emtpy array to hold the data from MySQL
      var results = [];

      //generating each index in the Task database
      for (var i = 0; i < dbTask.length; i++) {
        total += dbTask[i].productive_time;
        results.push(dbTask[i]);
      }
      res.render("report", {
        total: total,
        dbTask: results
      });
    });
  });

  app.get("/help-FAQ", function (req, res) {
    res.render("help-FAQ")
  });
}
