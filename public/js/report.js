$(document).ready(function(){
	$("#login-form").on("submit", function(event) {
		event.preventDefault();

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
	      	data: [20, 60],
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


});