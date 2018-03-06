$(document).ready(function() {
  // Getting references to our form and inputs
  var loginForm = $(".login");
  var nameInput = $("#parentName-login");
  var passwordInput = $("#parentPassword-login");
  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      name: nameInput.val().trim(),
      password: passwordInput.val().trim()
    };
    if (!userData.name || !userData.password) {
      return;
    }
    // If we have an name and password we run the loginUser function and clear the form
    loginUser(userData.name, userData.password);
    nameInput.val("");
    passwordInput.val("");
  });
  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(name, password) {
    $.post("/api/login", {
      name: name,
      password: password
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, log the error
    }).catch(function(err) {
      console.log(err);
    });
  }
});