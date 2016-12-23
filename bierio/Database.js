var mongoose = require("mongoose");
mongoose.Promise = Promise;
var Beers;

module.exports = (function() {
    var that = {},
        db = mongoose.connection,
        url,
        connected = false;

    function init(config) {
        url = "mongodb://" + config.mongo.host + ":" + config.mongo.port + "/" + config.mongo.database;

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
      if(queryObject === undefined){
          queryObject = {};
      }
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

    function getBeerByQuery(query) {
      return new Promise(function(resolve, reject) {
        Beers.find(query, function(err, beers) {
          if(err) {
            reject(err);
          }else {
            resolve(beers);
          }
        });
      });
    }

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

    function addBeer(object) {
      var beer = {};
      if(object.name == undefined || object.name == null) {
        return false;
      }
      beer.name = object.name;
      if(object.manufacturer != undefined && object.manufacturer != null) {
        beer.manufacturer = object.manufacturer;
      }
      if(object.age != undefined && object.age != null) {
        beer.age = object.age;
      }
      if(object.city != undefined && object.city != null) {
        beer.city = object.city;
      }
      return new Promise(function(resolve, reject) {
        var item = new Beers(beer);
        item.save(function(err) {
          if (err) reject();
          else resolve(item);
        });
      })

    }

    function addTagToBeer(id, tag) {
      return new Promise(function(resolve, reject) {
          Beers.update({_id: id}, {$push: {tag: tag}}, function(err, beer) {
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
          Beers.findByIdAndRemove(id, function(err, beer) {
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
    that.getBeerById = getBeerById;
    that.getBeerByQuery = getBeerByQuery;
    that.addTagToBeer = addTagToBeer;
    that.addBeer = addBeer;
    that.deleteBeerById = deleteBeerById;
    that.isConnected = isConnected;
    return that;
})();