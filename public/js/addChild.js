$(document).ready(function() {
  getChildren();

  $("#add-child-submit").on("click", function (event) {
    event.preventDefault();
    var childName = $("#childName").val().trim();
    var exerciseMultipler = $("#exercise_multiplier").val().trim();
    var readingMultiplier = $("#reading_multiplier").val().trim();
    var arr = [];

    var obj = {
      name: childName,
      array: [
        {
          "taskName": "exercise",
          "task_weight": (exerciseMultipler / 100)
        },
        {
          "taskName": "reading",
          "task_weight": (readingMultiplier / 100)
        }
      ]
    }

    $.post("/addChild", obj, function () {
      console.log("Object sent.");
    })

    getChildren();
  });
})

function getChildren() {
  $.get("/children", function (res) {
    console.log(res);

    if(!(res.length === 0)) {
      $("#childrenContainer").empty();

      for (var i = 0; i < res.length; i++ ) {
        var a = 
        '<div class="col-md-4">' + 
          '<a href="#"><p class="circle" value="' + res[i].id + '"><span>' + res[i].name + '</span></p></a>' +
        '</div>';

        $("#childrenContainer").append(a);
      }
    }
  })
}