$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $(".signup");
  var nameInput = $("#parentName-register");
  var passwordInput = $("#parentPassword-register");
  // When the signup button is clicked, we validate the name and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      name: nameInput.val().trim(),
      password: passwordInput.val().trim()
    };
    if (!userData.name || !userData.password) {
      return;
    }
    // If we have an name and password, run the signUpUser function
    signUpUser(userData.name, userData.password);
    nameInput.val("");
    passwordInput.val("");
  });
  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(name, password) {
    $.post("/api/signup", {
      name: name,
      password: password
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, handle it by throwing up a boostrap alert
    }).catch(handleLoginErr);
  }
  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});