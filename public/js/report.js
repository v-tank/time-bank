$(document).ready(function () {

  var tasksCanvas = document.getElementById("tasksChart");

  Chart.defaults.global.defaultFontFamily = "Lato";
  Chart.defaults.global.defaultFontSize = 18;
  //data from the Task fill into the pie
  var tasksData = {
    labels: [
      name1,
      name2
    ],
    datasets: [
      {
        data: [pt1, pt2],
        backgroundColor: [
          "#FF6384",
          "#63FF84"
        ]
      }]
  };

  var pieChart = new Chart(tasksCanvas, {
    type: 'pie',
    data: tasksData
  });

});