var Server = Server || {};
Server = (function (port) {

    
    var path = require('path');
    var express = require('express');
    var app = express();
    var server = require('http').Server(app);
    var DB = require("./db");

    app.use(express.static(path.join(__dirname, "../client")));
    console.log(path.join(__dirname, "../client"));

    server.listen(port, () => {
        console.log("Running on port", port);
    });
    
    // new DB();
    

    
})((process.env.PORT || 8080));
/*
var http = require('http')
const server = http.createServer(function(req, res) {
    //res.writeHead(200);
    //res.end('Hello Http');
    hello();
    
});
server.listen(8080);
*/