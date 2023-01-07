//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { Console } = require("console");
const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signUp.html");
});
app.post("/", function (req, res) {
    console.log()
    const first = req.body.first;
    const last = req.body.last;
    const email = req.body.email;
    // console.log(first, last, email);
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: first,
                    LNAME: last
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us8.api.mailchimp.com/3.0/lists/55c9e9e124";
    // const url = "https://us8.api.mailchimp.com/3.0/lists/55c9e9e124";




    // res.send("submitted");


    const options = {
        method: "POST",
        auth: "vinayak:d7b4a55671645d7f2fa0855cf9a15137-us8"
    }
    const request = https.request(url, options, function (response) {
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
        if (response.statusCode == 200) {
            res.send("submitted succesfully");

        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }
    })
    request.write(jsonData);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
});


app.listen(0.0.0.0:$PORT, function () {
    console.log("server is running on port 3000");
});




