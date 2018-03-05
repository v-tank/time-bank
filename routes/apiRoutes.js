var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    db.Parents.findAll({}).then(function(dbParent) {
      console.log(dbParent);
      res.json(dbParent);
    });
  });

  app.post("/api/new", function(req, res) {
  	db.Child.create({
  		name: req.body.name
  	}).then(function(dbChild) {
  		res.json(dbChild);
  	});
  });


};