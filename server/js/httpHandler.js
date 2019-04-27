const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messages = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
 

  if (req.method === "GET" && req.url === "/command") {
  
    var command = messages.dequeue();
    if (command !== undefined){
    res.write(command);
    }
    res.writeHead(200, headers);
    res.end();
  }

  else {
    res.writeHead(200, headers);
    res.end();
  }

};
