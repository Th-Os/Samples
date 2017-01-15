var database = require("./Database.js");
var config = require("./Config.json");
var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/beer", function(req, res) {
    if(isEmpty(req.query)) {
      database.get({type: "all", object: {}}).then(function(beers) {
          if(beers.length === 0) {
            res.status(500).json({response: "no objects found",
                      query: req.query});
          }else {
            res.status(200).json(beers);
          }
      }).catch(function(err) {
          console.log(err);
          res.sendStatus(500);
      });
    }else {
      database.get({type: "query", object: req.query}).then(function(beers) {
        if(beers.length === 0) {
          res.status(400).json({response: "no beer found.",
                    query: req.query});
        }else {
          res.status(200).json(beers);
        }

      }).catch(function(err) {
        console.log(err);
        res.sendStatus(500);
      });
    }
});

app.get("/api/beer/:id", function(req, res) {
    database.get({type: "id", object: req.params.id}).then(function(beer) {
      if(beer.length > 0) {
        res.status(200).json(beer);
      }else {
        res.status(400).json({response: "No item was found.", id: req.params.id});
      }
    }).catch(function(err) {
      console.log(err);
      res.sendStatus(500);
    });

});

app.post("/api/beer", function(req, res) {
    database.get({type: "add", object: req.body}).then(function(beer) {
      res.status(200).json(beer);
    }).catch(function(err) {
      console.log(err);
      res.sendStatus(500);
    });

});

app.post("/api/beer/:id/:tag", function(req, res) {
    database.get({type: "addTag", object: {id: req.params.id, tag: req.params.tag}}).then(function(beer) {
      res.status(200).send({
        response: "Beer successfully updated",
        tag: req.params.tag
      });
    }).catch(function(err) {
      console.log(err);
      res.sendStatus(500);
    });
});

app.delete("/api/beer/:id", function(req, res) {
    database.get({type: "delete", object: req.params.id}).then(function(beer) {
      if(beer == null) {
        res.status(400).send({response: "Beer is already removed."});
      }else {
        res.status(200).send({
          response: "Beer successfully deleted",
          id: req.params.id
        });
      }
    }).catch(function(err) {
      console.log(err);
      res.sendStatus(500);
    });
});

function isEmpty(obj) {
  for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

database.init(config);
database.connect().then(function() {
    console.log("Connection success!");
}).catch(function(err) {
    console.log("There was an error!");
    console.log(err);
});

app.listen(config.local.port);
