var DB = DB || {};

DB = function() {
    
    var mongoose = require('mongoose');
    
    //var mongodb = require('mongodb');
    //var MongoClient = mongodb.MongoClient;
    //var url = 'mongodb://localhost:27017/test';
    var that = {},
        db;
    
    function init() {
        mongoose.connect("mongodb://192.168.99.100:32768/test");
        db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
          console.log("connected to " + db);
        });
        /*
        MongoClient.connect(url, function (err, db) {
          if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
          } else {
            console.log('Connection established to', url);

            db.close();
          }
        });
        */
    }
    
    init();
    return that;
}

module.exports = DB;