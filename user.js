
var loadJS = function(url, implementationCode, location){
    //url is URL of external file, implementationCode is the code
    //to be called from the file, location is the location to 
    //insert the <script> element

    var scriptTag = document.createElement('script');
    scriptTag.src = url;

    scriptTag.onload = implementationCode;
    scriptTag.onreadystatechange = implementationCode;

    location.appendChild(scriptTag);
};
var loadJS2 = function(url, implementationCode, location,id){
    //url is URL of external file, implementationCode is the code
    //to be called from the file, location is the location to 
    //insert the <script> element

    var scriptTag = document.createElement('script');
    scriptTag.src = url;

    scriptTag.onload = implementationCode(id);
    scriptTag.onreadystatechange = implementationCode;

    location.appendChild(scriptTag);
};
function piechart(uid)
{
var width = 520,
    height = 270,
    radius = Math.min(width, height) / 2;


var color = d3.scaleOrdinal(d3.schemeCategory10);

var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 80);


var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.frequency; });


var svg = d3.select("#showme1").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
   
 .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


d3.csv("tag_frequency_user1.csv", type, function(error, data) 
{
  if (error) throw error;

  
data=data.filter(function(d){return d.userid==uid;})
var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  
g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.tag); });

  
g.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
     
 .text(function(d) { return d.data.tag; });

});


function type(d) {
  d.frequency = +d.frequency;
  d.userid = +d.userid;
  return d;
}


};
function bar(uid)
{
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 500 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([height, 0]);
          
// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#showme").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.csv("activity.csv", function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {	

    d.count = d.count;
  });

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
};
data=data.filter(function (d){return d.uid==uid;})
var p=[];
 data.forEach(function(d) {	

   p.push(parseInt(d.count));
  });
  // Scale the range of the data in the domains
  x.domain(data.map(function(d) { return d.label; }));
  y.domain([0, getMaxOfArray(p)]);


  // append the rectangles for the bar chart
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.label); })
      .attr("width",x.bandwidth()).attr("fill","steelblue")
      .attr("y", function(d) { return y(d.count); })
      .attr("height", function(d) { return height - y(d.count); });
var xaxis=  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 10) + ")")
      .style("text-anchor", "middle")
      .text("Time Period");
  // add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y));
 svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Answers posted");  
});
};
function mainscript(){
var container = d3.select('#main');
var width = 400,
    height = 600,
    radius = 10;
var svg = container.append("svg")
    .attr("width", "450")
    .attr("height", "660");
var color = d3.scaleOrdinal(d3.schemeCategory10);
var width=450,
	height=660;
var simulation = d3.forceSimulation()
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

d3.json("user_profile.json", function(error,graph) {
  if (error) throw error;
function onclicks()
{
d3.selectAll('circle').style("fill-opacity",0.3);
t = d3.select(this).node().__data__;
d3.select(this).style("fill-opacity",1);
d3.select('#showme').selectAll('svg').remove();
d3.select('#showme1').selectAll('svg').remove();
d3.select('#info').selectAll('text').remove();
d3.csv("u.csv", function(error, data) 
{
		if (error) throw error;
	data=data.filter(function(d){return d.uid==t.uid});
  data.forEach(
	function(d) 
	{	
	d3.select('#info').append('text').html("<p >Name: "+d.name+"<br> Age: "+d.age+"<br> Reputation: "+d.rep+"<br> Personal Summary: "+d.aa+"<br> Website: "+d.web+"</p>").style("font-size","16px");
 
 	}
	);
		
           
}
);
loadJS2('http://d3js.org/d3.v4.js', bar, document.getElementById('showme'),t.uid);
loadJS2('//d3js.org/d3.v4.0.0-alpha.4.min.js', piechart, document.getElementById('showme1'),t.uid);
}
  var node = svg.append("g")
      .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes)
    .enter().append("circle").style("stroke",function(d){return color(d.group);}).style("stroke-width","3.5px")
      .attr("r", function(d){return d.reputation/1000+40;})
      .attr("fill",function(d){return color(d.group);}).style("fill-opacity","0.5");
node.call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));
    
node.on("click",onclicks);

node.append("title").text(function(d) { return 'Reputation: '+d.reputation; }).attr("dx", 10)
     .attr("dy", ".25em").style("font-size", "18px");



  simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(graph.links);

  function ticked() {
   
    node.attr("cx", function(d) { return d.x = Math.max(radius, Math.min(width - radius, d.x)); })
        .attr("cy", function(d) { return d.y = Math.max(radius, Math.min(height - radius, d.y)); });
  }

});

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}
};
function loadmain()
{loadJS("https://d3js.org/d3.v4.min.js", mainscript, document.getElementById('main'));}
