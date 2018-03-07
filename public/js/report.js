$(document).ready(function(){
	var tasksCanvas = document.getElementById("tasksChart");

	Chart.defaults.global.defaultFontFamily = "Lato";
	Chart.defaults.global.defaultFontSize = 18;

	var tasksData = {
	    labels: [
	      "Activity",
	      "Reading"
	    ],
	    datasets: [
	      {
	      	data: [30, 70],
	        // data: {{productive_time}},
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