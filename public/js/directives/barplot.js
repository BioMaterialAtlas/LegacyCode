var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {
  $scope.name = 'World';

  $scope.dataObject={
    'Data_x':[1,2,3,4,5],
    'Data_y':[6,7,8,9,10],
    'Label_x':['A','B','C','D','E'],
    'Label_y':['Q','W','R','T','Y']

  };

  $scope.drawBar=function(){
      // Area to define the barplot
    var margin_left=40;
    var margin_right=40;
    var margin_top=20;
    var margin_bottom=20;
    var height=500-margin_top-margin_bottom;
    var width=500-margin_left-margin_right;
    var svg = d3.select("#plotarea").append("svg")
    .attr("width", width + margin_left + margin_right)
    .attr("height", height + margin_top + margin_bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin_left + "," + margin_top + ")");

    dataset={};
    combined_data=$scope.dataObject.Data_x.concat($scope.dataObject.Data_y);
    combined_labels=$scope.dataObject.Label_x.concat($scope.dataObject.Label_y);
    dataset.labels=combined_labels;
    dataset.values=combined_data;
    console.log(dataset)

    // create an x-axis 
    var x_axis = d3.scaleBand().range([ 0, width ])
  .domain(combined_labels)
    
  svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x_axis))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");
  var y_axis = d3.scaleLinear()
  .domain([0, 5])
  .range([ height, 0]);
  
  svg.append("g").call(d3.axisLeft(y_axis));


  svg.selectAll("mybar").data(dataset).enter().append("rect")
    .attr("x", function(d) { return x_axis(d.labels); })
    .attr("y", function(d) { return y_axis(d.values); })
    .attr("width", x_axis.bandwidth())
    .attr("height", function(d) { return height - y(d.values); })
    .attr("fill", "#69b3a2")
  }
  $scope.drawBar()
});
