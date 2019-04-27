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
    res.writeHead(200, headers);
    var commands = ["left","right","down","up"];
    var randomCommand = commands[Math.floor(Math.random()*commands.length)];
    var command = messages.dequeue();
    
    if (command !== undefined){
    res.write(command);
    }
    if (command === undefined){
      res.write(randomCommand);
    }
   
    
    res.end();

  } else {
    res.writeHead(200, headers);
    res.end();
  }

};
