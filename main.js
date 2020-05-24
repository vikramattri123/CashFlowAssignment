const express =require("express");
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/Users',{useNewUrlParser: true});
var conn=mongoose.connection;
var studentSchema= new mongoose.Schema({
    Name:String,
    email:String,
    Age:Number,
    gpa:Number,
    Registration_Id:Number,
    Batch:Number
});
var TableModel= mongoose.model('Student',studentSchema);
const app=express();
const bodyParser=require("body-parser");
app.use('/static',express.static('public'));
app.set('view engine','twig');
app.set('views','./Public/views');
const { check, validationResult } = require('express-validator');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended:false });
app.get("/",(req,res)=>
{
  res.render('index_page',{title:"Login page"});
})
app.post("/",urlencodedParser,[
  check('uname','Name Is Incoorect ').isLength({min:5}),
  check('password','Password must be Five Character').isLength({min:5})
],(req,res)=>
{
  errors=validationResult(req);
  console.log(errors.mapped());
  if(req.body.uname == 'Vikram' || req.body.password == '12345' )
  {
    TableModel.find({Name:"Vikram"},function(err,data)
    {
        if (err) res.json(err);
        res.render('logged',{user:data});
    });
  }
  if(!errors.isEmpty())
  { 
    res.render('index_page',{name:req.body.uname,password:req.body.password,error:errors.mapped()});
    
  }
  else
  {
   console.log("data is Incorrect");
  }
}).listen(9000,console.log("Server is Working on port no 9000"));





// app.get("/admin",(req,res)=>
// {
//   res.render(__dirname+'/admin.twig');
// })