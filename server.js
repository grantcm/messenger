var express = require("express");
var bodyParser = require("body-parser");
var passport = require('passport');
var mongodb = require("mongodb");
var passport = require('passport');
var WebSocket = require('ws');
var http = require('http');
var ObjectID = mongodb.ObjectID;

require('./app_api/models/db');
require('./app_api/config/passport');
var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var routesApi = require('./app_api/routes/index');


var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
app.use(passport.initialize());
app.use('/api', routesApi);

//Initialize server and web socket server
var server = http.createServer(app);
var wss = new WebSocket.Server({ server });

// Add Web Socket event callbacks
wss.on('connection', (ws) => {
  ws.isAlive = true;
  ws.on('message', (messageJSON) => {
    let message = JSON.parse(messageJSON);
    var newMessage = new Message();
    newMessage.conversationId = message.conversationId;
    newMessage.sentBy = message.sentBy;
    newMessage.sentByName = message.sentByName;
    newMessage.contents = message.contents;
    Message.create(newMessage, (err) => {
      if(err) {
        console.error(err);
      } else {
        wss.clients.forEach(client => {
          client.send(JSON.stringify(newMessage));
        });
      }
    });
  });

  ws.on('pong', () => {
    ws.isAlive = true;
  })
});

// setInterval(() => {
//   wss.clients.forEach(ws => {
//     if (!ws.isAlive) return ws.terminate();

//     ws.isAlive = false;
//     ws.ping(null, false, true);
//   });
// });

server.listen(process.env.PORT || 8080, function () {
  console.log(`App now running on port: ${server.address().port}`);
});