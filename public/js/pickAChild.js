$(document).ready(function() {

  // Listener function to grab the value of the childID from the dropdown list of children and route the user to the designated earnIt route
  $("#earnit-img").on("click", function(event) {
    event.preventDefault();

    var childId = $("#dropdown").val();

    var url = "/earnIt/" + childId;
    
    window.location.href = url;
  });
});