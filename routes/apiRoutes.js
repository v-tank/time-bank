// Require the necessary files and packages
var db = require("../models");
var passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  app.get("/", function (req, res) {
    // console.log("At the root");
    // If the parent already has an account send them to the members page
    // if (req.user) {
    //   res.redirect("/profile");
    // }
    res.render("index"); // Render the index page upon load to prompt user to log in
  });

  // Route the user to their designated profile page by taking in the user ID 
  app.get("/profile/:id", isAuthenticated, function (req, res) {
    res.render("profile", { id: req.params.id, user: req.user.name }); // Render the profile page using the parent's name
  });

  // Route to add a child to the database
  app.post("/addChild", function(req, res) {
    // console.log(req.user);
    // console.log(req.body.array);

    // Creates a new child using the Parent ID as a foreign key
    db.Child.create({
      name: req.body.name,
      ParentId: req.user.id
    }).then(function(results) {
      // console.log(results);

      // Once a child is created, create tasks for that child using the multipliers set by the parents upon creation
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

  // Route to log the user in after checking the password against the database; redirects to the root upon failure
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
    
  // Route to handle the sign up process
  app.post("/signup", function (req, res) {
    // console.log(req.body);

    // Creates a new account for the parent using the username and password; generates a hash for the password on the backend
    db.Parent.create({
      name: req.body.username,
      password: req.body.password
    }).then(function (user) {
      // console.log("in here");
      res.render("profile", {id: user.id});
    }).catch(function (err) {
      // console.log(err);
      // res.json(err);

      // Displays an error if the username is already taken 
      console.log(err.errors[0].message);
      res.render("index", { alert: err.errors[0].message });
    });
  });

  // Route for logging the user out
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

  // Returns all the children associated with a specific parent ID
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

  // Route to display the 'earn-it' page for the child
  app.get("/earnIt/:id", function (req, res) {

    // Find the child ID in the database and render the page using the retrieved info
    db.Child.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.render("earnIt", { id: req.params.id, name: result.name });
    });
  });

  // Update route to update the banked time in the database
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

  // GET route to render the 'spend-it' page. Had to hard code to only display one user because we ran out of time
  app.get("/spendIt", function (req, res) {
    res.render("spendIt");
  });

  // Grabs the tasks for a specific child and creates a pie chart
  app.get("/report/:id", function (req, res) {
    //grabbing the data from Tasks table, then show it on the chart
    db.Task.findAll({
      where: {
        ChildId: req.params.id
      }

    }).then(function (dbTask) {

      // this totals productive time for the kid
      var total = 0;
      // creates an empty array to hold the data from MySQL
      var results = [];

      // generating each index in the Task database
      for (var i = 0; i < dbTask.length; i++) {
        total += dbTask[i].productive_time;
        results.push(dbTask[i]);
      }
      
      // Renders the report page with the retrieved data
      res.render("report", {
        total: total,
        dbTask: results
      });
    });

  });

  // GET route to render the FAQ page
  app.get("/help-FAQ", function (req, res) {
    res.render("help-FAQ")
  });
}
