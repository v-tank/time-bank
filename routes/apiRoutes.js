var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    db.Parents.findAll({}).then(function(dbParent) {
      console.log(dbParent);
      res.json(dbParent);
    });
  });

  app.post("/signup", function(req, res) {
    db.Parent.create({
        name: req.body.name,
        password: req.body.password
      })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });
}