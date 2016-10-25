const http = require('http');
const hello = require("./hello.js");

const server = http.createServer(function(req, res) {
    res.writeHead(200);
    res.end('Hello Http');
    
    hello();
});
server.listen(8080);