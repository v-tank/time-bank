var db = require("../models");
var passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  app.get("/", function (req, res) {
    // If the parent already has an account send them to the members page
    if (req.user) {
      res.redirect("/profile");
    }
    res.render("signup")
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the profile page
    // res.redirect("/profile");
    res.render("login");
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
    // console.log(req.body);
    db.Parent.create({
      name: req.body.name,
      password: req.body.password
    }).then(function () {
      res.redirect(307, "/login");
    }).catch(function (err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

<<<<<<< HEAD


 // POST for adding new child
 app.post('/child', function(req, res) {
  var name = req.body.name;
  db.Parents.create({
    name: name,
  })
    .then(function(dbParent) {
      console.log(dbParent);
      res.json(dbParent);
    })
});

 // DELETE for deleting child
 app.delete('/child/:id', function(req, res) {
  var id = req.params.id;
  db.Parents.destroy({
    where: { id: id }
  })
    .then(function(dbParent) {
      console.log(dbParent);
      res.json(dbParent);
    });
});


  // GET one child by id
  app.get('/child/:id', function(req, res) {
    var id = req.params.id;
    db.Parents.find({
      where: { id: id }
    })
      .then(function(dbParent) {
        console.log(dbParent);
        res.json(dbParent);
      });
  });



 // POST for adding new task
 app.post('/task', function(req, res) {
  var taskname = req.body.taskname;
  db.Parents.create({
    taskname: taskname,
  })
    .then(function(dbParent) {
      console.log(dbParent);
      res.json(dbParent);
    })
});

  // GET all tasks
  app.get('/tasks', function(req, res) {
    db.Parent.findAll()
      .then(function(dbParent)  {
        res.json(dbParent);
      });
  });

  // GET one task by id
  app.get('/task/:id', function(req, res) {
    var id = req.params.id;
    db.Parents.find({
      where: { id: id }
    })
      .then(function(dbParent) {
        console.log(dbParent);
        res.json(dbParent);
      });
  });

 // DELETE a task
 app.delete('/task/:id', function(req, res) {
  var id = req.params.id;
  db.Parents.destroy({
    where: { id: id }
  })
    .then(function(dbParent) {
      console.log(dbParent);
      res.json(dbParent);
    });
});
};
=======
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
>>>>>>> 3f1e9f2889bce6ba66aa5509399aa0f2442112c6
