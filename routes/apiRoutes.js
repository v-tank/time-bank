var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    db.Parents.findAll({}).then(function(dbParent) {
      console.log(dbParent);
      res.json(dbParent);
    });
  });
}