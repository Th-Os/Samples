var mongoose = require("mongoose");
var url = "mongodb://192.168.99.100:32768/test";

// Our database object
var db = mongoose.connection;

// On Error callback
db.on("error", function(err) {
    console.log(err);
});

// On connection success callback
db.once("open", function() {
   // We we are connected!
   console.log("We are connected!");

   // Save a Kitten
   var fluffy = new Kitten({name: "Fluffy", age: 2});
   fluffy.save(function(err, kitten) {
      if(err) console.log(err);
      console.log(kitten);
   });

   // Find a kitten
   Kitten.find({name: "Fluffy"}, function(err, kitten) {
      if(err) console.log(err);
      console.log(kitten);
   });
});

// Model our Schema
var kittySchema = mongoose.Schema({
    name: String,
    age: Number
});

var Kitten = mongoose.model("Kitten", kittySchema);

// Connect!
mongoose.connect(url);
