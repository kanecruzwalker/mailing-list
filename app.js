const express = require("express");
const app = express();
const https = require("https");
require("dotenv").config();



const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.uEmail;



    var data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,

                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);

    const url = "https:us10.api.mailchimp.com/3.0/lists/"+process.env.LIST;
    const options = {
        method: "POST",
        auth: "kane:"+process.env.MAIL_CHIMP
    }

    const request =https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();
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