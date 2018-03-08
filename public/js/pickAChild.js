$(document).ready(function() {

  $("#earnit-img").on("click", function(event) {
    event.preventDefault();

    var childId = $("#dropdown").val();

    var url = "/earnIt/" + childId;
    
    window.location.href = url;
  });
});