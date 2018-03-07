$(document).ready(function() {
  getChildren();

  $("#add-child-submit").on("click", function(event) {
    event.preventDefault();
    var childName = $("#childName").val().trim();
    var exerciseMultipler = $("#exercise_multiplier").val().trim();
    var readingMultiplier = $("#reading_multiplier").val().trim();
    var arr = [];

    var obj = {
      name: childName,
      exercise: (exerciseMultipler)/100,
      reading: (readingMultiplier)/100,
      array: arr
    }

    for (property in obj) {
      console.log(property); // Outputs: foo, fiz or fiz, foo
      arr.push(property);
    }

    console.log(arr);


    $.post("/addChild", obj, function() {
      console.log("Object sent.");
    });

    getChildren();
  });
  
  function getChildren() {
    $.get("/children", function(res) {
      console.log(res);
      // <a class="dropdown-item" href="#">Action</a>
      $("#dropdown").empty();

      for (var i = 0; i < res.length; i++) {
        var a = '<option value="' + res[i].id + '">' + res[i].name + '</option>';
        $("#dropdown").append(a);
      }
    });
  }
});