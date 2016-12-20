var Server = Server || {};
Server = (function (port) {

    
    var path = require('path');
    var express = require('express');
    var app = express();
    var DB = require("./db");

    app.use(express.static(path.join(__dirname, "../client")));
    console.log(path.join(__dirname, "../client"));

    app.listen(port, () => {
        console.log("Running on port", port);
    });
    
    new DB();
    

    
})((process.env.PORT || 8080));