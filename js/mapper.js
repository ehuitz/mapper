// CMPS3252 - Algorithms Project 
// Elmer R Huitz 2014110553



//Scatter Chart Constructor

var nodes = [];

var chart = new CanvasJS.Chart("chartContainer", {
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
			toolTipContent: "{name}</br><b>X: </b>{x}<br/><b>Y: </b>{y}",
			dataPoints: [],
			markerSize: 50,
		},


	],


});


//-- Event handler for the input tag and
var inputElement = document.getElementById("listOfPointsInput");
inputElement.addEventListener("change", readGraphFile, false);


// Plotting Graph from File Function 
function readGraphFile() {
	var fileList = this.files;
	var reader = new FileReader();
	reader.readAsText(fileList[0]);
	reader.onload = function () {
		renderChart(reader);
	}

}

//Main Render Function
function renderChart(reader) {
	//Plot Main Points (Nodes)
	var strDps = reader.result;
	var dps = [];

	//split by new line
	strDps = strDps.split("\n");

	// push to array to make x,y and letter name
	for (var i = 0; i < strDps.length; i++) {
		dps.push({
			x: parseInt(strDps[i].split(",")[0]),
			y: parseInt(strDps[i].split(",")[1]),
			name: ((i + 10).toString(36).toUpperCase()),
			w: i
		});
	}

	//console.log(dps);

	//set chart coordinates with array
	chart.options.data[0].dataPoints = dps;
	nodes = dps;
	//draw the points
	chart.render();

}

//Add Edges
function addEdge(edge) {

	//Add Chart of Type Line
	var series1 = {
		type: "line",
	};

	chart.options.data.push(series1);

	series1.dataPoints = [
		edge[0], edge[1]
	];

	//console.log(series1.dataPoints);

	chart.render();

}

//DSF Traverse main algorithm

function DSFTravel(matrix, size, start) {
	const
		traverse = (tree, node, visited = []) => {
			visited.push(node);
			if (visited.length === size) return visited;
			for (let n of tree[node]) {
				if (visited.includes(n)) continue;
				let result = traverse(tree, n, [...visited]);
				if (result.length === size) return result;
			}
			return [];
		},
		tree = matrix.reduce((r, a, i) => {
			r[i] = [];
			a.forEach((v, j) => v && r[i].push(j));
			return r;
		}, {});

	return traverse(tree, start);
}



function runTraverse() {
	event.preventDefault();

	//Adjency Matrix from File
	var data = [
		[0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0],
		[0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
		[0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
		[1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0],
		[1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
		[0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
		[0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1],
		[0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0],
		[0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
		[0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
		[0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0]
	],
		traResult = DSFTravel(data, 12, 0);


	//map array of travert result to nodes to get plotting points
	const mappedArray = traResult.map((item) => nodes.find((node) => node.w === item));
	//console.log(mappedArray);
	const edgesArray = mappedArray.map((currentNode, index, actualArray) => {
		const nextIndex = index === actualArray.length - 1 ? 0 : index + 1;
		return [
			{ x: currentNode.x, y: currentNode.y },
			{ x: actualArray[nextIndex].x, y: actualArray[nextIndex].y },
		];
	});
		for (let i = 0; i < edgesArray.length; i++) {

			addEdge(edgesArray[i]);

		}
}

