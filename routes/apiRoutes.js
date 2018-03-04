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

};
