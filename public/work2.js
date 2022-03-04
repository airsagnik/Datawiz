var dataset=[10,20,30,40,50];
d3.select(".bargraph").selectAll("rect").data(dataset).enter().append("rect").attr("x",(d,i)=>30*i).attr("y",(d)=>400-3*d).attr("width","25").attr("height",(d)=>3*d).attr("class","bar").append("title").text((d)=>"Total casses:"+d);
console.log("hello");

const dset1 = [
      [ 34,    78 ],
      [ 109,   280 ],
      [ 310,   120 ],
      [ 79,    411 ],
      [ 420,   220 ],
      [ 233,   145 ],
      [ 333,   96 ],
      [ 222,   333 ],
      [ 78,    320 ],
      [ 21,    123 ]
    ];
d3.select(".scatterplot").selectAll("circle").data(dset1).enter().append("circle").attr("cx",(d)=>d[0]).attr("cy",(d)=>400-d[1]).attr("r",5);

const colors=d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);
console.log(colors(21));
const dset2=[8,21,15,29,11,6];
var datapie=d3.pie().sort(null)(dset2);
console.log(datapie);
var segment=d3.arc().innerRadius(0).outerRadius(150).padAngle(0.05).padRadius(50);
var section=d3.select(".piechart").append("g").attr("transform","translate(200,250)").selectAll("path").data(datapie);
section.enter().append("path").attr("d",segment).attr("fill",function(d){
  console.log(d.data);
  return colors(d.data);
});



var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select(".linegraph")
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",

  // When reading the csv, I must format variables:
  function(d){
    return { date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value }
  },

  // Now I can use this dataset:
  function(data) {

    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.value; })])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.value) })
        )

})
