var express = require("express");
var app = express();

var port = process.env.PORT || 3000

app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));

app.get('/',function (req,res){
  res.send('Hello World!');
}
)

app.listen(port,function (){
  console.log("server started listening");
})
