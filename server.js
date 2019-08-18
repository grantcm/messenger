var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var USERS_COLLECTION = "users";
var CONVERSATIONS_COLLECTION = "conversations";
var MESSAGES_COLLECTION = "messages";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

//Generic Error Handler
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

// API routes

app.get("/api/users", (req, res) => {
  db.collection(USERS_COLLECTION).find({}).toArray((err, docs) => {
    if(err) {
      handleError(res, err.message, "Failed to get Users");
    } else {
      res.status(200).json(docs);
    }
  })
});

app.post("/api/users", (req, res) => {
  var newUser = req.body;
  newUser.createDate = new Date();
  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  } else {
    db.collection(USERS_COLLECTION).insertOne(newUser, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new user.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

/**
 * Get a conversation by ID
 */
app.get("/api/conversations/:id", (req, res) => {
  db.collection(CONVERSATIONS_COLLECTION).findOne({_id: new ObjectID(req.params.id)}).toArray((err, docs) => {
    if(err) {
      handleError(res, err.message, "Failed to get conversations");
    } else {
      res.status(200).json(docs);
    }
  })
});

/**
 * Get a conversation containing a user ID
 */
app.get("/api/conversations/includes/:id", (req, res) => {
  db.collection(CONVERSATIONS_COLLECTION).find({participants: new ObjectID(req.params.id)}).toArray((err, docs) => {
    if(err) {
      handleError(res, err.message, "Failed to get conversations with " + req.params.id);
    } else {
      res.status(200).json(docs);
    }
  })
});

/**
 * Add a new conversation
 */
app.post("/api/conversations", (req, res) => {
  var newConversation = req.body;
  newConversation.createDate = new Date();
  if (!req.body.between) {
    handleError(res, "Invalid user input", "Must provide participants in the conversation.", 400);
  } else {
    db.collection(CONVERSATIONS_COLLECTION).insertOne(newConversation, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new conversation.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

/**
 * Get messages by conversation ID
 */
app.get("/api/messages/conversation/:id", (req, res) => {
  db.collection(MESSAGES_COLLECTION).find({conversationId: new ObjectID(req.params.id)}).toArray((err, docs) => {
    if(err) {
      handleError(res, err.message, "Failed to get messages with " + req.params.id);
    } else {
      res.status(200).json(docs);
    }
  })
});


 /**
  * Add a new message
  */
 app.post("/api/messages", (req, res) => {
  var newMessage = req.body;
  newMessage.createDate = new Date();
  if (!req.body.conversationId) {
    handleError(res, "Invalid message", "Must provide conversationId.", 400);
  } else {
    db.collection(MESSAGES_COLLECTION).insertOne(newMessage, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new message.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});
