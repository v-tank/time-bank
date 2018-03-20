// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var passport = require("passport");
var logger = require("morgan");
var expressValidator = require("express-validator");
var MySQLStore = require('express-mysql-session')(session);
// var local = require("passport-local");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(expressValidator());
// app.use(logger("dev"));

var options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'time_bank_v2'
};

var sessionStore = new MySQLStore(options);

// Set middleware
app.use(session({
  secret: "P4s$W0|/D",
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  // cookie: { secure: true }
}));

// Set passport middleware 
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
// require("./routes/htmlRoutes.js")(app);
require("./routes/apiRoutes.js")(app);
// require("./config/passport")(passport);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});