var path = require("path");

module.exports = function(app, passport) {
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  app.get("/login", function(req, res) {
    res.render("login");
  });

  // app.get("/profile", isLoggedIn, function(req, res) {
  // 	res.render("profile");
  // });

  // app.get("/logout", function(req, res) {
  // 	req.logout();
  // 	res.redirect("/");
  // });

  // app.post("/signup", passport.authenticate("local", {  	

  //   successRedirect: "/login",
  //   faliureRedirect: "/signup",
  //   faliureFlash: true
  // }));
}

// function isLoggedIn(req, res, next) {
// 	if (req.isAuthenticated()) {
//  		return next()
//  	} else {
//  		return res.redirect("/");
//  	}
// };




