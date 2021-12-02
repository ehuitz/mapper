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
		maximum: 19,
		interval: 1,
		gridColor: "lightblue",
		gridThickness: 1
	},
	axisY: {
		title: "Y",
		maximum: 19,
		interval: 1,
		gridColor: "lightblue",
		gridThickness: 1
	},
	data: [
		{
			type: "scatter",
			toolTipContent: "{name}</br><b>X: </b>{x}<br/><b>Y: </b>{y}",
			dataPoints: [],
			markerSize: 30,
		},


	],
});


//-- Event handler for the input tag and
var inputElement = document.getElementById("listOfPointsInput");
inputElement.addEventListener("change", readGraphFile, false);


// Read Graph File and Plot Nodes
function readGraphFile() {
	var fileList = this.files;
	var reader = new FileReader();
	reader.readAsText(fileList[0]);
	reader.onload = function () {
		//Plot Nodes
		renderChart(reader);
	}

}

//Read Adjacency File and Add to Array
function readMatrixFile(){
	event.preventDefault();
	var inputElement = document.getElementById("adjencyMatrixInput");
	var fileList = inputElement.files;
	var plainMatrix = new FileReader();
	plainMatrix.readAsText(fileList[0]);
	plainMatrix.onload = function () {
		//Add to Matrix
		//console.log(plainMatrix);
		renderMatrix(plainMatrix)
	}
}

//Adjency Matrix Render Function
function renderMatrix(plainMatrix) {
	var matrix = plainMatrix.result;	
	const mtx = matrix.split("\n").map(e => [...e].map(e => +e))
	runTraverse(mtx);
}

//Graph Render Function
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
			w: i,
		});
	}
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

function runTraverse(data) {
	event.preventDefault();
	//Adjency Matrix from File

		traResult = DSFTravel(data, 12, 0);



	//map array of travert result to nodes to get plotting points
	const mappedArray = traResult.map((item) => nodes.find((node) => node.w === item));
	console.log(mappedArray);
	const edgesArray = mappedArray.map((currentNode, index, actualArray) => {
		const nextIndex = index === actualArray.length - 1 ? 0 : index + 1;
		return [
			{ x: currentNode.x, y: currentNode.y },
			{ x: actualArray[nextIndex].x, y: actualArray[nextIndex].y },
		];
	});

	const solutionArray = traResult.map((item) => nodes.find((node) => node.w === item));
	const path = solutionArray.map((currentNode, index, actualArray) => {
		const nextIndex = index === actualArray.length - 1 ? 0 : index + 1;
		return [
			{ Node: currentNode.name },
		];
	});
	


	const timer = ms => new Promise(res => setTimeout(res, ms))
	async function load() {
		// We need to wrap the loop into a function to wait 2 seconds to plot next point
		for (let i = 0; i < edgesArray.length; i++) {
			addEdge(edgesArray[i]);
			await timer(2000);
	
		}
	} load();
	
	console.log(path);

}

