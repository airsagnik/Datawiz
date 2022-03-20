const express=require('express');
const bodyparser=require('body-parser');
//we are importing the libralies onto the variables
//imagine express and bodyparser as function names now that can be called using paranthesis
//body parser is to get the post request in a easy map format

const app=express();
//here we called express function that sets up our server
//in javascript we have functions that are exported out from library and those are called


app.set('view engine', 'ejs');
//ejs initialisation process
app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static("public"));
//when we have to send multiple files and folders back to user we put them under public folder
//var config=require('./config.js');
   //multer
var multer  = require('multer');
var upload = multer();
var mp2;
app.get("/",function(req,res)
{
    req.send("index.html");
});
//multer is used to receive files
//get request is initiated when we type localhost3000 and if the server is listning to this port
//it will send whatever is enclosed in the send() parameter it sends the index.html file along with css and js file


app.post('/',function(req,res){
  console.log(req.body);
  var xsel=req.body.xselect;
  var ysel=req.body.yselect;
  console.log(mp2.get(0)[xsel]);
  console.log(mp2.get(0)[ysel]);
  var xdata=[];
  var ydata=[];
  var len=mp2.size;
  for(i=1;i<len;i++)
  {

    if(isNaN(mp2.get(i)[xsel]))
    {
      xdata.push(mp2.get(i)[xsel]);
    }
    else
    {
      xdata.push(parseInt(mp2.get(i)[xsel],10));
    }

    if(isNaN(mp2.get(i)[ysel]))
    {
      ydata.push(mp2.get(i)[ysel]);
    }
    else
    {
      ydata.push(parseInt(mp2.get(i)[ysel],10));
    }
  }

  var datasend={
    "xaxis":xdata,
    "yaxis":ydata,
  };

  var jsondata=JSON.stringify(datasend);

  res.render("display",{xaxis:jsondata,xname:mp2.get(0)[xsel],yname:mp2.get(0)[ysel]});
});


//code below is the post request activate when we submit the csv file
//this function brings the file gets all the values in string and prepares the map

app.post('/handleFile',upload.single('uploadCsv'), function(req, res, next) {
          // req.file is the `uploadCsv` file
          // req.body will hold the text fields, if there were any
          console.log(req.file);
          // the buffer here containes your file data in a byte array
          var csv=req.file.buffer.toString('utf8');

           csv=csv.split(/\r?\n|\r/);
           //the entire string is splitted into an array of string where the string is the data in a single row
          console.log(csv);
          var parameters=[];
          var dataarr=[];
          var mp1=new Map();
          var i=0;
          var cnt=0;
          var wrd="";
          while(i<csv.length)
          {
             var row=csv[i];
             var rowarr=row.split(',');

             //here we are further breaking down the array and isolating each element from each row
             mp1.set(i,rowarr);
             i++;

          }
          mp2=mp1;
          //this is done to make the map available globally
          console.log(mp1);
          //console.log(mp1.get(0));
          res.send(mp1.get(0));
          //now we are sending the map with 0 as the key back to the user
          //this will show the list of headings in the csv
     });


//this tells the server on which port to listen for get and post request

app.listen(process.env.PORT||3000,function(){
  console.log("server is running");
})
