$(document).ready(function() {

  $("#earnit-img").on("click", function() {
    var childId = $("#dropdown").val();
    console.log(childId);

    $.get("/earnIt/" + childId, function(res) {
      // console.log(res);
    })
  })
  
  

});