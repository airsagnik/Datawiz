document.querySelector(".notifier").style.display="none";
document.querySelector(".notifier2").style.display="none";
//the above code are the spinners we initially keep them hidden

document.getElementById("sub").addEventListener("click",submit);
//the above line means that if anyone clicks the button avtivate the function

document.querySelector(".btn").addEventListener("click",function(){
  document.querySelector(".notifier2").style.display="block";
});

function submit()
{
  document.querySelector(".notifier").style.display="block";
  //spinner started shoing that data is uploading
  d3.select("notifier").append("h1").text("Please wait while we load data");
  var csv=document.getElementById('inputFile').files[0];
    var formData=new FormData();
    formData.append("uploadCsv",csv);
    var request = new XMLHttpRequest();

 //here you can set the request header to set the content type, this can be avoided.
 //The browser sets the setRequestHeader and other headers by default based on the formData that is being passed in the request.
  request.open("POST","/handleFile", true);
  //request.setRequestHeader("Content-type", "multipart/form-data"); //----(*)

  request.onreadystatechange = function (){
    document.querySelector(".notifier").style.display="none";
    //once data is loaded we hide the spinner again
    if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
      console.log("yey");
      d3.select("notifier").remove();
      var datamat=request.responseText;
      var d=datamat.substring(1,datamat.length-1).split(",");
      //this has the data heading from svg
      console.log(d);
      for(i=0;i<d.length;i++)
      {

        d3.select("#xaxis").append("div").attr("class","csvvalues").html('<h3><input class="selection" type="radio" name="xselect" value='+i+'> <label class="selection" for="huey">'+d[i].substring(1,d[i].length-1)+'</label></h3>');
        //using d3 we inject the text into the location
      }
      for(i=0;i<d.length;i++)
      {

        d3.select("#yaxis").append("div").attr("class","csvvalues").html('<h3><input class="selection" type="radio" name="yselect" value='+i+'> <label class="selection" for="huey">'+d[i].substring(1,d[i].length-1)+'</label></h3>');
        // d3.select("#yaxis").append("h3").html('<label class="selection" for="huey">'+d[i]+'</label>');
      }

      // d3.select("#xaxis").data(d).enter().append("h3").html((d,i)=>'<li>'+d+'</li>');
      // d3.select("#yaxis").data(d).enter().append("h3").html((d,i)=>'<li>'+d+'</li>');
      }
  }

request.send(formData);
}

//onready state is used to wait till we receive a response back from server and
//then execute the given function
//ignore code below

// var dataset=[1,34,12,56,78,98,90,44,22,33,78,98];
// var dataset2=[
//                   [ 34,    78 ],
//                   [ 109,   280 ],
//                   [ 310,   120 ],
//                   [ 79,    411 ],
//                   [ 420,   220 ],
//                   [ 233,   145 ],
//                   [ 333,   96 ],
//                   [ 222,   333 ],
//                   [ 78,    320 ],
//                   [ 21,    123 ]
//                 ];
// d3.select('body').append("h2").text("love data vizu");
// d3.select('ul').selectAll("li").text("op bepar");
// //d3.select('ul').selectAll("li").data(dataset).enter().append("li").html("<li>hello moto</li>");
// d3.select('ul').selectAll("li").data(dataset).enter().append("li").html((d)=>'<li>'+d+" chicken"+'</li>');
// d3.select("body").selectAll("div")
//       .data(dataset)
//       .enter()
//       .append("div").attr("class","bar");

// d3.select("body").selectAll("div").data(dataset).enter().append("div").attr("class","bar").style("height",(d)=>(5*d+"px")).style("background-color",(d)=>{
//   if(d>50)
//   return "red";
//   else
//   return "blue";
// });

// code formaking bargraph----refer to this
// d3.select("body").append("svg").attr("height","400px").attr("width","400px").style("background-color","pink");
// d3.select("svg").selectAll("rect").data(dataset).enter().append("rect").attr("x",(d,i)=>30*i).attr("y",(d)=>400-3*d).attr("width","25").attr("height",(d)=>3*d).attr("class","bar").append("title").text((d)=>"Total casses:"+d);
// d3.select("svg").selectAll("text").data(dataset).enter().append("text").text((d)=>d).attr("x",(d,i)=>30*i).attr("y",(d,i)=>(400-3*d-5));
// svg.selectAll("circle")
//        .data(dataset2)
//        .enter()
//        .append("circle").attr("cx",(d)=>d[0]).attr("cy",(d)=>h-d[1]).attr("r","5");
