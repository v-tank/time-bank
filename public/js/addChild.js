$(document).ready(function() {
  getChildren();

  $("#addTaskBtn").on("click", function(event) {
    console.log("Holi!");

    var whichDiv = document.getElementById("tasksDiv");
    var div = $("<div>");

    // div.append('<div class="form-row"><div class="col"><input type="text" class="form-control" placeholder="Task Name" name="taskInputs[]"></div><div class="col"><input type="text" class="form-control" placeholder="Task Weight Percentage (ex: 40)" name="taskInputs[]"></div></div>');

    div.html("Test");

    whichDiv.append(div);
    console.log("appended?")
  })

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
        var a = '<input type="radio" id="' + res[i].name + '" name="kids" value="' + res[i].name + '"><label for="' + res[i].name + '">' + res[i].name + "</label>";
        $("#childrenContainer").append(a);
      }
    }
  })
}