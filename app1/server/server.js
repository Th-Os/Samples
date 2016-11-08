var Server = Server || {};
Server = (function (port) {

    var server = require('http').Server(app);
    var express = require('express');
    var app = express();
    var hello = require("./hello.js");

    app.use(express.static(__dirname + "/../client"));

    server.listen(port, () => {
        console.log("Running on port", port);
    });
    

    
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