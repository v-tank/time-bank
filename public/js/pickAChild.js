$(document).ready(function() {

  $("#earnit-img").on("click", function() {
    var childId = $("#dropdown").val();

    // alert(childId);

    //  grab child id
    // var Newlocation = "/earnit/"+childId;
    var url = "/earnIt/" + childId;
    // alert(url);
    // debugger;
    
    window.location.href = url;

    // $.get('/earnIt/' + childId + "/");
    // window.location.reload(url);

    
  })
  
  

});