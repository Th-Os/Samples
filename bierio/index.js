var database = require("./Database.js");
var config = require("./Config.json");
var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/beer", function(req, res) {
    if(req.query == {}) {
      database.getAllBeers().then(function(beers) {
          res.json(beers);
      }).catch(function(err) {
          console.log(err);
          res.sendStatus(500);
      });
    }else {
      database.getBeerByQuery(req.query).then(function(beers) {
        res.json(beers);
      }).catch(function(err) {
        console.log(err);
        res.sendStatus(500);
      });
    }
});

app.get("/api/beer/:id", function(req, res) {
    database.getBeerById(req.params.id).then(function(beer) {
      if(beer.length > 0) {
        res.json(beer);
      }else {
        res.send({response: "No item was found.", id: req.params.id});
      }
    }).catch(function(err) {
      console.log(err);
      res.sendStatus(500);
    });

});

app.post("/api/beer", function(req, res) {
    database.addBeer(req.body).then(function(beer) {
      res.json(beer);
    }).catch(function(err) {
      console.log(err);
      res.sendStatus(500);
    });

});

app.post("/api/beer/:id/:tag", function(req, res) {
    database.addTagToBeer(req.params.id, req.params.tag).then(function(beer) {
      res.send({
        response: "Beer successfully updated",
        tag: req.params.tag
      });
    }).catch(function(err) {
      console.log(err);
      res.sendStatus(500);
    });
});

app.delete("/api/beer/:id", function(req, res) {
    database.deleteBeerById(req.params.id).then(function(beer) {
      if(beer == null) {
        res.send({response: "Beer was removed before."});
      }else {
        res.send({
          response: "Beer successfully deleted",
          id: req.params.id
        });
      }
    }).catch(function(err) {
      console.log(err);
      res.sendStatus(500);
    });
});

database.init(config);
database.connect().then(function() {
    console.log("Connection success!");
}).catch(function(err) {
    console.log("There was an error!");
    console.log(err);
});

app.listen(config.local.port);
