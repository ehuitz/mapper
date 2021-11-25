// CMPS3252 - Algorithms Project 
// Elmer R Huitz 2014110553


//Scatter Chart Constructor
var chart = new CanvasJS.Chart("chartContainer", {
	zoomEnabled: true,
	zoomType: "xy",
	title: {
		text: "Chart from Text File"
	},
	axisX: {
		title: "X",
		maximum: 11,
		interval: 1,
		gridColor: "lightblue",
		gridThickness: 1
	},
	axisY: {
		title: "Y",
		maximum: 11,
		interval: 1,
		gridColor: "lightblue",
		gridThickness: 1
	},
	data: [
		{
			type: "scatter",
			toolTipContent: "<b>X: </b>{x}<br/><b>Y: </b>{y}",
			dataPoints: [],
			markerSize: 50,
		}
	],
	
	
});


//-- Event handler for the input tag
var inputElement = document.getElementById("listOfPointsInput");
inputElement.addEventListener("change", handleFiles, false);

function handleFiles() {
	var fileList = this.files;
	var reader = new FileReader();

	setInterval(function () {
		reader.readAsText(fileList[0]);
		reader.onload = function () {
			renderChart(reader);
		}
	}, 1000);

	drawLine(chart);

}

function renderChart(reader) {
	var strDps = reader.result;
	var dps = [];

	strDps = strDps.split("\n");

	for (var i = 0; i < strDps.length; i++) {
		dps.push({
			x: parseInt(strDps[i].split(",")[0]),
			y: parseInt(strDps[i].split(",")[1])
		});
	}
	chart.options.data[0].dataPoints = dps;
	chart.render();
}

function drawLine(chart){
	var ctx=chart.ctx;

	ctx.beginPath();
	ctx.strokeStyle = "#000";
	ctx.lineWidth =2;
	ctx.moveTo(1,4);
	ctx.lineTo(2,8);
	ctx.stroke();

}