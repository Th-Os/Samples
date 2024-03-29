var mongoose = require("mongoose");
mongoose.Promise = Promise;
var Beer;

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
            age: Date,
            city: String,
            tag: []
        });

        Beer = mongoose.model("Beers", beerSchema);
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

    function get(query) {
      switch(query.type) {
        case "all":
          return getAllBeers(query.object);
        case "id":
          return getBeerById(query.object);
        case "query":
          return getBeerByQuery(query.object);
        case "add":
          return addBeer(query.object);
        case "addTag":
          return addTagToBeer(query.object);
        case "delete":
          return deleteBeerById(query.object);
      }
    }

    function getAllBeers(queryObject) {
      if(queryObject === undefined){
          queryObject = {};
      }
        return new Promise(function(resolve, reject) {
            Beer.find(queryObject, function(err, beers) {
                if(err) {
                    reject(err);
                } else {
                    resolve(beers);
                }
            });
        });
    }

    function getBeerByQuery(query) {
      let type = Object.keys(query)[0];
      let value = query[Object.keys(query)[0]];
      let obj = {};
      obj[type] = { $regex: value,
                    $options: 'i'};
      return new Promise(function(resolve, reject) {
        Beer.find(obj , function(err, beers) {
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
          Beer.find({_id: mongoose.Types.ObjectId(id)}, function(err, beer) {
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
        beer.age = new Date(object.age);
      }
      if(object.city != undefined && object.city != null) {
        beer.city = object.city;
      }
      return new Promise(function(resolve, reject) {
        var item = new Beer(beer);
        item.save(function(err) {
          if (err) reject();
          else resolve(item);
        });
      })

    }

    function addTagToBeer(object) {
      return new Promise(function(resolve, reject) {
          Beer.update({_id: object.id}, {$push: {tag: object.tag}}, function(err, beer) {
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
          Beer.findByIdAndRemove(id, function(err, beer) {
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
    that.get = get;
    that.isConnected = isConnected;
    return that;
})();
