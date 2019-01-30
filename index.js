var http = require('http');
var url = require('url');
// create http server
var server = http.createServer(function(req, res){
    // parsing the request url
    var parsedUrl = url.parse(req.url, true);

    // get the path
    var path = parsedUrl.pathname;

    // trim  trailing / from the url
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    
    // check the router for a matching path for a handler

    var chosenHandler = typeof(router[trimmedPath]) !=='undefined'? router[trimmedPath] : handlers.notFound;

    // route the request to handler specified in the router
    chosenHandler(function(statusCode,Payload) {
      
        statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
        // parse payload to string
        var jsonString = JSON.stringify(Payload);
        // set headers to json format
        res.setHeader('Content-type','application/json');
        // write status code
        res.writeHead(statusCode);
        res.end(jsonString);
    });
    
    
});
// server listening on port 3000
server.listen(3000,function(){
    console.log("This server is listening on port 3000 now");
});

var handlers = {};

// handler for hello

handlers.hello = function(callback){
   
    callback(200, {"name": "Hello World"});

};

// handler for other routes
handlers.notFound = function(callback){
    callback(404, {"error": "page not found"});
}
// router 

var router = {
    "hello": handlers.hello
}