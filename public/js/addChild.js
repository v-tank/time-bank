$(document).ready(function() {
   getChildren(); // Fetches children upon start

  $("#add-child-submit").on("click", function(event) {
    event.preventDefault();

    // Grabs the form values
    var childName = $("#childName").val().trim();
    var exerciseMultipler = $("#exercise_multiplier").val().trim();
    var readingMultiplier = $("#reading_multiplier").val().trim();
    var arr = [];

    // Creates an object from the form values
    var obj = {
      name: childName,
      exercise: (exerciseMultipler)/100,
      reading: (readingMultiplier)/100,
      array: arr
    }

    for (property in obj) {
      console.log(property); 
      arr.push(property);
    }

    console.log(arr);

    // Posts the object to the route and adds to the database
    $.post("/addChild", obj, function() {
      console.log("Object sent.");
    });

    getChildren(); // Refreshes the children after a child is added to the database
  });
  
  // Function make a GET call to grab children from the database and add them to a dropdown menu
  function getChildren() {
    $.get("/children", function(res) {
      console.log(res);
      // <a class="dropdown-item" href="#">Action</a>
      $("#dropdown").empty();

      // Loop through the returned array of results and dynamically add the children to the dropdown
      for (var i = 0; i < res.length; i++) {
        var a = '<option value="' + res[i].id + '">' + res[i].name + '</option>';
        $("#dropdown").append(a);
      }
    });
  }
});
