var DB = DB || {};

DB = function() {
    
    var mongodb = require('mongodb');
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/test';
    var that = {};
    
    function init() {
        console.log("hello");
        
        MongoClient.connect(url, function (err, db) {
          if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
          } else {
            console.log('Connection established to', url);

            db.close();
          }
        });
    }
    
    init();
    return that;
}

module.exports = DB;