// var path = require("path");
// var isAuthenticated = require("../config/middleware/isAuthenticated");

// module.exports = function (app, passport) {
//   app.get("/", function(req, res) {
//    // If the parent already has an account send them to the members page
//    if (req.parent) {
//      res.redirect("/api/profile");
//    }
//    res.render("signup")
//   });

//   app.get("/api/login", function(req, res) {
//     // If the user already has an account send them to the profile page
//     if (req.parent) {
//       res.redirect("/profile");
//     }
//     res.render("login");
//   });

//   app.get("/api/profile", isAuthenticated, function(req, res) {
//     res.render("profile");
//   });
// }
