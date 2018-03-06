var path = require("path");
// var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app, passport) {
  app.get("/calculator", function(req, res) {
  	res.sendFile(path.join(__dirname, "../public/calculator.html")); 
	});

	app.get("/help-FAQ", function(req, res) {
  	res.sendFile(path.join(__dirname, "../public/help-FAQ.html")); 
	});

}

