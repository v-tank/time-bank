// Require necessary packages
var express = require("express");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3000; // Set up a deployed port or a local one

var app = express(); // Initialize express

app.use(express.static("public")); // Imports the static files from the public folder
app.use(bodyParser.urlencoded({
  extended: false
}));

// Set up Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/controller.js");

app.use("/", routes);

app.listen(PORT); // Listen for requests on the port