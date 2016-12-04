displayTags = (function(){

svg_dom.remove();

var domainName = d3.select(this).text();
var margin = {top: 40, right: 10, bottom: 40, left: 10},
    width = 960 - margin.left - margin.right-0,
    height = 500 - margin.top - margin.bottom;

d3.csv("Dummy1.csv", function(error, data) {


  var categories = d3.keys(d3.nest().key(function(d) { return d.domain; }).map(data));
  var color = d3.scale.ordinal().range(["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854", "#7D3C98", "#B03A2E", "#196F3D"]);
  var fontSize = d3.scale.pow().exponent(5).domain([0,1]).range([30,60]);
  var fontsize = [20,40,60,80,100,110,120];
  var data1=data.filter(function(d){
        return d.domain == domainName;
      });
  var layout = d3.layout.cloud()
      .timeInterval(10)
      .size([width, height-100])
      .words(data1)
      .rotate(function(d) { return 0; })
      .font('Helvetica')
      .fontSize(function(d,i) { 
        if (d.size > 0 && d.size<=100) return fontsize[0];
        else if (d.size > 100 && d.size<=500) return fontsize[1];
        else if (d.size > 500 && d.size<=1000) return fontsize[2];
        else if (d.size > 1000 && d.size<=2000) return fontsize[3];
        else if (d.size > 2000 && d.size<=3000) return fontsize[4];
        else if (d.size > 3000 && d.size<=6000) return fontsize[5];
        else if (d.size > 6000 && d.size<=9000) return fontsize[6];
        else if (d.size > 9000 && d.size<=13000) return fontsize[7]; })
        .text(function(d) { return d.tags;})
      .spiral("archimedean")
      .on("end", draw)
      .start();
  var svg = d3.select("#svg_domain").append("g");

  var textboxTitle = svg.append("text")
      .attr("x", 0)
      .attr("y", 410)
      .text("Selected Tags")
      .attr("font-size", "30px")
      .attr("font-family", "Century Gothic");

  svg.append("text")
      .attr("x", 480)
      .attr("y", 500)
      .text(domainName)
      .attr("font-weight", "bold")
      .attr("font-size", "45px")
      .attr("fill","#212f3c")
      .attr("text-anchor","middle")
      //.attr("class", "text-shadow")
      .attr("font-family", "Century Gothic");

  var textbox = svg.append("rect")
                            .attr("x", 230)
                            .attr("y", 380)  
                            .attr("width", 680)
                            .attr("height", 50)
                            .attr("fill", "#e4e8e8")
                            .attr("id", "textbox");

  /*var svg2 = d3.select('body').append("svg")
      .attr("width", 1180)
      .attr("height", 70)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg2.append("text")
      .attr("x", 350)
      .attr("y", 30)
      .text(domainName)
      .attr("font-size", "30px")
      .attr("font-family", "Helvetica");*/

  /*var svg = d3.select('body').append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");*/

/*var svg2 = d3.select('body').append("svg")
      .attr("width", 220 + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");*/

  var wordcloud = svg.append("g")
      .attr('class','wordcloud')
      .attr("transform", "translate(" + width/2 + "," + height/2 + ")");



  var x0 = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1)
      .domain(categories);

  var xAxis = d3.svg.axis()
      .scale(x0)
      .orient("bottom");

  var selectedTags = []
  function draw(words) {
    wordcloud.selectAll("text")
        .data(words)
      .enter().append("text")
        .attr('class','word')
        .style("font-size", function(d) { return d.size  + "px"; }) 
        .style("font-family", function(d) { return d.font; })
        .style("fill", function() { 
          var color = ["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854", "#7D3C98", "#B03A2E"];
          return color[Math.floor(Math.random()*6)+1]; })
        /*.style("fill", function(d) { 
            var paringObject = data.filter(function(obj) { return obj.password === d.text});
            return color(paringObject[0].category); 
        })*/  
        .attr("text-anchor", "middle")
        .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
        .text(function(d) { return d.text; })
        .transition()
            .each(function () {
                  d3.select(this).on("mouseover", function(){
                    d3.select(this).attr("font-weight","bold");
                  });

                  d3.select(this).on("mouseout", function(){
                    d3.select(this).attr("font-weight", "");
                  });

                  d3.select(this).on("click", function (d) {
                    if (selectedTags.length == 5)
                      return alert("Oops! Cannot add more tags.");
                    else
                    {
                      selectedTags.push(d.text);

                      d3.select("#textbox").remove();
                      svg.append("rect")
                            .attr("x", 230)
                            .attr("y", 380)  
                            .attr("width", 680)
                            .attr("height", 50)
                            .attr("fill", "#e4e8e8")
                            .attr("id", "textbox");
                      for (i=0; i<selectedTags.length; i++)
                      {
                        svg.append("text")
                              .text(selectedTags[i])
                              .attr("x", 240+i*136)
                              .attr("y", 410)
                              .attr("fill", "black  ")
                              .attr("font-family", "Helvetica").
                              attr("font-size", "15px");
                      }
                      return 1;
                    }

                  });
            });
  };

});
//return selectedTags;
});