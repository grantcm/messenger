var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var USERS_COLLECTION = "users";
var CONVERSATIONS_COLLECTION = "conversations";
var MESSAGES_COLLECTION = "messages";

var app = express();
app.use(bodyParser.json());

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
  if (!req.body.firstName || !req.body.lastName) {
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
