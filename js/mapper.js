// CMPS3252 - Algorithms Project 
// Elmer R Huitz 2014110553



//Scatter Chart Constructor

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






//-- Event handler for the input tag
var inputElement = document.getElementById("listOfPointsInput");

// -- On input change, run graph
inputElement.addEventListener("change", handleGraphFile, false);

// Plotting Graph from File Function 
function handleGraphFile() {
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

	strDps = strDps.split("\n");

	for (var i = 0; i < strDps.length; i++) {
		dps.push({
			x: parseInt(strDps[i].split(",")[0]),
			y: parseInt(strDps[i].split(",")[1]),
			name: ((i + 10).toString(36).toUpperCase()),
			index: i
		});
	}
	
	console.log(dps);
	chart.options.data[0].dataPoints = dps;

	//Render Current Chart
	chart.render();
	
}

function addEdge(){
	event.preventDefault();


		//Add Edges
		var series1 = { 
			type: "line",
			};
		
		chart.options.data.push(series1);
		
		series1.dataPoints = [
			{ x:1, y: 4  },{ x:2, y:8}	
		];
		chart.render();


}

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

function runTraverse(){



	event.preventDefault();

	var data = [
		[0,0,0,0,1,1,0,0,0,0,0,0],
		[0,0,0,1,0,0,0,0,1,1,0,0],
		[0,0,0,0,0,1,1,0,0,0,0,1],
		[0,1,0,0,1,0,0,0,1,0,0,0],
		[1,0,0,1,0,1,0,0,0,1,0,0],
		[1,0,1,0,1,0,0,1,0,0,0,1],
		[0,0,1,0,0,0,0,0,1,0,0,1],
		[0,0,0,0,0,1,0,0,0,1,1,1],
		[0,1,0,1,0,0,1,0,0,0,1,0],
		[0,1,0,0,1,0,0,1,0,0,1,0],
		[0,0,0,0,0,0,0,1,1,1,0,0],
		[0,0,1,0,0,1,1,1,0,0,0,0]
			],
		result = DSFTravel(data, 12, 0);
		
	console.log(result);
}

