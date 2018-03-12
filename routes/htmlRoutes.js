var path = require("path");

module.exports = function (app, passport) {
  app.get("/calculator", function(req, res) {
  	res.render("calculator"); 
	});
}

