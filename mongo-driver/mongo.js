var MongoClient = require("mongodb").MongoClient;

var url = "mongodb://192.168.99.100:32768/test";

MongoClient.connect(url, function(err, db) {
    console.log("Connected to server correctly!");

    // Lets insert a cat
    //insertDocument(db);

    // Lets update our cat
    updateDocument(db);

    // Lets find the cat
    findDocument(db);

    db.close();
});

function insertDocument(db) {
    var collection = db.collection("cats");
    collection.insert({name: "Fluffy", age: 1}, function(err, result) {
        if(err) return;
        console.log(result);
    });
}

function findDocument(db) {
    var collection = db.collection("cats");
    collection.find({}).toArray(function(err, docs) {
        console.log("Found the following cats: ");
        console.dir(docs);
    });
}

function updateDocument(db) {
    var collection = db.collection("cats");
    collection.updateOne(
      {name: "Fluffy"},
      { $set: {age: 3}},
      function(err, result) {
          console.log(result);
    });
}
