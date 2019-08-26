const express = require("express");
const bodyParser = require("body-parser");
const passport = require('passport');
const WebSocket = require('ws');
const http = require('http');

const db = require('./app_api/models/db').default;
require('./app_api/config/passport');
const Message = db.model('Message');
const routesApi = require('./app_api/routes/index');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

//Create mongoose promise to provide to mongoose connection for session store
let app = express();
let sessionParser = session({
  //TODO set prod uri
  store: new MongoStore({ url: "mongodb://localhost:27017/test"}),
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60
  }
});

app.use(bodyParser.json());
app.use(sessionParser);

// Create link to Angular build directory
let distDir = __dirname + "/dist/";
app.use(express.static(distDir));
app.use(passport.initialize());
app.use('/api', routesApi);

//Initialize server and web socket server
var server = http.createServer(app);
var wss = new WebSocket.Server({ server });

// Add Web Socket event callbacks
wss.on('connection', (ws, req) => {
  sessionParser(req, {}, () => { 
    ws.userId = req.session.user;
    ws.isAlive = true;
  });

  ws.on('message', (messageJSON) => {
    let message = JSON.parse(messageJSON);
    let newMessage = new Message();
    newMessage.conversationId = message.conversationId;
    newMessage.sentBy = message.sentBy;
    newMessage.contents = message.contents;
    Message.create(newMessage, (err) => {
      if (err) {
        console.error(err);
      } else {
        wss.clients.forEach(client => {
          //Broadcast message to either sender or receipient
          if(message.receipients.includes(client.userId) || message.sentBy === client.userId) {
            client.send(JSON.stringify(newMessage));
          }
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

MongoStore

server.listen(process.env.PORT || 8080, function () {
  console.log(`App now running on port: ${server.address().port}`);
});