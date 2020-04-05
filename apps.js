var express = require("express");
var app = express();
var bodyParser = require('body-parser')

var total_marks = 0;
var logged_in = false;

var pass= {
  user:"shivan",
  pass:"shivan"
}
var questions = ["1)The state which has desert in India is",
                  "2)The headquarters of the coffee board of India is ",
                  "3)The largest fresh water lake in India is",
                  "4)Name the Governor General who abolished sati in 1829",
                  "5)The chemical name of Chloroform is "]
var options = [{option1:"Rajasthan",option2:"Punjab",option3:"Uttar Pradesh",option4:"Madhya Pradesh"},
              {option1:"Mysore",option2:"Kolkata",option3:"Bangalore",option4:"Cochin"},
              {option1:"Pulicat Lake",option2:"Veeranam Lake",option3:"Chilka Lake",option4:"Kolleru Lake"},
              {option1:"Lord Clive",option2:"Lord Curzon",option3:"Lord William Bentinck",option4:"Lord Dalhousie"},
              {option1:"Sulphuric acid",option2:"Sodium Chloride",option3:"Sodium Carbonate",option4:"Trichloromethane"}]

var current_qs= 0;
var answers = ["option1","option3","option4","option3","option4"]
var list = new Array(questions.length);

var port = process.env.PORT || 3000

app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',function (req,res)
  {
    res.render('index',{ret:""});
  }
)

app.get('/submit',function (req,res)
  {
    for(var j=0;j<questions.length;j++){
      if(list[j] === answers[j])
        total_marks++;
    }
    res.render('submit',{mark:total_marks});
    total_marks = 0;
  }
)

app.post('/submit',function (req,res)
  {
    list = [];
    list = new Array(questions.length);
    current_qs = 0;
    res.redirect('/quiz');
  }
)
app.get('/quiz',function (req,res)
  {
    if(logged_in)
    {
      res.render('quiz',
      {qs:questions[current_qs],
      optionone:options[current_qs].option1,
      optiontwo:options[current_qs].option2,
      optionthree:options[current_qs].option3,
      optionfour:options[current_qs].option4,checked:list[current_qs]});
     }
     else
     {
      res.redirect('/');
     }
}
)
app.post('/quiz',function (req,res)
  {
    if(typeof req.body.option != "undefined")
    {
      list[current_qs] = req.body.option ;
    }
    if(logged_in)
    {
      if(req.body.button == "Next"||req.body.button == "Previous")
      {
        if(req.body.button == "Next")
        current_qs = (current_qs+1)%questions.length;
        else {
          current_qs = (current_qs-1+questions.length)%questions.length;
        }
        res.render('quiz',
        {qs:questions[current_qs],
        optionone:options[current_qs].option1,
        optiontwo:options[current_qs].option2,
        optionthree:options[current_qs].option3,
        optionfour:options[current_qs].option4,checked:list[current_qs]});
      }
      else
      {
        res.redirect('/submit');
      }

    }else{
      res.redirect('/');
    }
}
)
app.post('/login',function (req,res)
{

  console.log(req.body);
  if((req.body.user === pass.user) && (req.body.pass === pass.pass))
  {
    logged_in = true;
    res.redirect('/quiz');
  }
  else
  {
    res.render('index',{ret:"Invalid username or password"});
  }
}
)
app.listen(port,function (){
  console.log("server started listening");
})
