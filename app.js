const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.get("/success", function(req, res){
    res.sendFile(__dirname + "/success.html");
});

app.get("/failure", function (req, res){
    res.sendFile(__dirname + "/failure.html");
});

app.listen(3000, function(){
    console.log("App listening on PORT 3000");
});