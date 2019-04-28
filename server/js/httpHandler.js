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
  
  
  if (req.method === "POST" && req.url === "/background.jpg") {
    //res.writeHead
    var imageFile = Buffer.alloc(0);
    console.log("POST from upload");
    var chunks = [];
    req.on('data', chunk => {
      imageFile = Buffer.concat([imageFile,chunk]);
    });

    req.on('end', () => {
      fs.writeFile(module.exports.backgroundImageFile,imageFile,(err) => {
        res.writeHead(404,headers);
        res.end();
      })
    })

    res.writeHead(200,headers);
    res.end();
  } 
  
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

  } else if (req.method === "GET" && req.url === "/image"){
    var filePath = path.join(__dirname, '../spec/water-lg.jpg');
    if (fs.existsSync(filePath) === false){
      
      res.writeHead(404, headers);
      res.end();
    
    } else {
      var stat = fs.statSync(filePath);
      res.writeHead(200, {
          "access-control-allow-origin": "*",
          "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
          "access-control-allow-headers": "content-type, accept",
          "access-control-max-age": 10,
          'Content-Type': 'image/jpeg',
          'Content-Length': stat.size,
      });

      var readStream = fs.createReadStream(filePath);
      // We replaced all the event handlers with a simple call to readStream.pipe()
      readStream.pipe(res);
    }
  } else if(req.method === "GET" && req.url.indexOf("spec") !== -1) {


    var filePath = path.join(__dirname, '..'+req.url);
    if (fs.existsSync(filePath) === false){
      
      res.writeHead(404, headers);
      res.end(); 
      console.log(next);
      next();
    } else {
      var stat = fs.statSync(filePath);
      res.writeHead(200, {
          "access-control-allow-origin": "*",
          "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
          "access-control-allow-headers": "content-type, accept",
          "access-control-max-age": 10,
          'Content-Type': 'image/jpeg',
          'Content-Length': stat.size,
      });

      var readStream = fs.createReadStream(filePath);
      // We replaced all the event handlers with a simple call to readStream.pipe()
      readStream.pipe(res);
    }
  } else {
    res.writeHead(200, headers);
    res.end();
  }

};
