var mongoose = require("mongoose");
var Beers;

module.exports = (function() {
    var that = {},
        db = mongoose.connection,
        url,
        connected = false;

    function init(config) {
        url = "mongodb://" + config.host + ":" + config.port + "/" + config.database;

        // Model our Schema
        var beerSchema = mongoose.Schema({
            name: String,
            manufacturer: String,
            age: Number,
            city: String,
            tag: []
        });

        Beers = mongoose.model("Beers", beerSchema);
    }

    function connect() {
        return new Promise(function(resolve, reject) {
            mongoose.connect(url);
            db.on("error", function(err) {
                reject();
            });

            db.on("disconnect", function() {
                connected = false;
            });

            db.once("open", function() {
                connected = true;
                resolve();
            });
        });
    }

    function getAllBeers(queryObject) {
      if(queryObject === undefined) (
          queryObject = {};
      )
        return new Promise(function(resolve, reject) {
            Beers.find(queryObject, function(err, beers) {
                if(err) {
                    reject(err);
                } else {
                    resolve(beers);
                }
            });
        });
    }
    // id ??
    function getBeerById(id) {
      return new Promise(function(resolve, reject) {
          Beers.find({_id: id}, function(err, beer) {
              if(err) {
                  reject(err);
              } else {
                  resolve(beer);
              }
          });
      });
    }

    function addBeer(name, manufacturer, age, city) {
      return new Promise(function(resolve, reject) {
          Beers.insert({name: name, manufacturer: manufacturer, age: age, city: city}, function(err, beer) {
              if(err) {
                  reject(err);
              } else {
                  resolve(beer);
              }
          });
      });
    }

    function addTagToBeer(id, tag) {
      return new Promise(function(resolve, reject) {
          Beers.update({_id: id}, {tag: tag}, function(err, beer) {
              if(err) {
                  reject(err);
              } else {
                  resolve(beer);
              }
          });
      });
    }

    function deleteBeerById(id) {
      return new Promise(function(resolve, reject) {
          Beers.delete({_id: id}, function(err, beer) {
              if(err) {
                  reject(err);
              } else {
                  resolve(beer);
              }
          });
      });
    }

    function isConnected() {
        return connected;
    }

    that.init = init;
    that.connect = connect;
    that.getAllBeers = getAllBeers;
    that.isConnected = isConnected;
    return that;
})();
