const express = require("express");
const bodyparser = require("body-parser");
const mongo = require("mongoose");
const app = express();

mongo.connect("mongodb://127.0.0.1:27017/first");
let dtbase = mongo.connection;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/form", (req, res) => {
  res.sendFile(__dirname + "/regform.html");
});

app.post("/fdata", (req, res) => {
  naame = req.body.name;
  usrname = req.body.uname;
  email = req.body.email;
  passwd = req.body.passwd;
  phone = req.body.phone;
  cllr = req.body.color;
  gender = req.body.gender;

  // res.send(`${naame} ${usrname}`);
  // json conver DB build
  var jdata = {
    Name: naame,
    Username: usrname,
    Email: email,
    Password: passwd,
    mobile: phone,
    Color: cllr,
    Gender: gender,
  };
  // send to DB
  dtbase.collection("formdata").insertOne(jdata, (err) => {
    if (err) throw err;
    res.redirect("/login");
  });
});

app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/contact.html");
});

app.post("/condata", (req, res) => {
  var uname = req.body.uname;
  var email = req.body.email;
  var mobile = req.body.phone;
  var messg = req.body.msg;
  
  //conver json
  var contdata={
    "Username":uname,
    "Email":email,
    "Mobile":mobile,
    "Message":messg,
  }
  // send to DB
  dtbase.collection("contactpage").insertOne(contdata,(err)=>{
    if(err) throw err;
    res.redirect("/");
  })
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.all("*", (req, res) => {
  res.sendFile(__dirname + "/404.html");
});

app.listen(8020, (req, res) => {
  console.log("http://localhost:8020");
});
