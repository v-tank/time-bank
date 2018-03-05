var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    db.Parents.findAll({}).then(function(dbParent) {
      console.log(dbParent);
      res.json(dbParent);
    });
  });



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
