// Capture Button Click For Signing Up
$(document).ready(function() {
  $("#page-sign-up-btn").on("click", function(event) {
    console.log("sign-up-btn on click");
    event.preventDefault();
   
    // Grabbed values from text boxes
    username = $("#username-signup-input").val().trim();
    password = $("#pass-signup-input").val().trim();

    $("#username-signup-input").val("");
    $("#pass-signup-input").val("");


  });

  // Capture Button Click for Logging In 
  $("#page-login-btn").on("click", function(event) {

     event.preventDefault();
   
    validUser = false; 
    var user = "";
    var pass = "";

  // Grabbed values from text boxes
    userNameInput = $("#username-login-input").val().trim();
    passWordInput = $("#pass-login-input").val().trim();

    $("#login").text("Logout");
    $("#username-login-input").val("");
    $("#pass-login-input").val("");

    console.log("The userName input is "+ userNameInput);


  });

});