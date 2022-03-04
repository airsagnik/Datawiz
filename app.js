const express=require('express');
const bodyparser=require('body-parser');


const app=express();
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

//var config=require('./config.js');
   //multer
var multer  = require('multer');
var upload = multer();
var mp2;
app.get("/",function(req,res)
{
    req.send("index.html");
});

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
      xdata.push(0);
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

app.post('/handleFile',upload.single('uploadCsv'), function(req, res, next) {
          // req.file is the `uploadCsv` file
          // req.body will hold the text fields, if there were any
          console.log(req.file);
          // the buffer here containes your file data in a byte array
          var csv=req.file.buffer.toString('utf8');
           csv=csv.split(/\r?\n|\r/);
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
             mp1.set(i,rowarr);
             i++;

          }
          mp2=mp1;
          console.log(mp1);
          //console.log(mp1.get(0));
          res.send(mp1.get(0));
     });



app.listen(3000,function(){
  console.log("server is running");
})
