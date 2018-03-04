var path = require("path");

module.exports = function(app, passport) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/index.handlebars"));
  });

  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/signup.handlebars"));
  });

  app.get("/profile", isLoggedIn, function(req, res) {
  	res.sendFile(path.join(__dirname, "../views/profile.handlebars"));
  });

  app.get("/logout", function(req, res) {
  	req.logout();
  	res.redirect("/");
  });

  app.post("/signup", passport.authenticate("local-signup", {
    successRedirect: "/profile",
    faliureRedirect: "/signup",
    faliureFlash: true
  }));
}

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
 		return next()
 	} else {
 		return res.redirect("/");
 	}
}