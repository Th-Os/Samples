var database = require("./Database.js");
var config = require("./Config.json");
var express = require("express");

var app = express();

app.get("/api/beer", function(req, res) {
    console.log("Connected; " + database.isConnected());
    /*var beers = database.getAllBeers().then(function(beers) {
        res.json(beers);
    }).catch(function(err) {
        console.log("There was an error!");
        res.sendStatus(500);
    });*/
});

app.get("/api/beer/{id}", function(req, res) {

});

app.post("/api/beer", function(req, res) {

});

app.post("/api/beer/{id}/tag", function(req, res) {

});

app.delete("/api/beer/{id}", function(req, res) {

});

database.init(config);
database.connect().then(function() {
    console.log("Connection success!");
}).catch(function(err) {
    console.log("There was an error!");
    console.log(err);
});

app.listen(8000);
