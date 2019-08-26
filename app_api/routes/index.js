var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.SECRET_KEY,
  userProperty: 'payload'
});

var ctrlAuth = require('../controllers/authentication');
var ctrlMessage = require('../controllers/message');
var ctrlUser = require('../controllers/user');
var ctrlConversation = require('../controllers/conversation');

// // profile
// router.get('/profile', auth, ctrlProfile.profileRead);
// TODO readd auth to post and gets
// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// Conversations API
router.post('/conversations', ctrlConversation.addConversation);
router.get('/conversations', ctrlConversation.getConversationById);
router.get('/conversations/participant', ctrlConversation.getConversationWithUserId);
router.get('/conversations/participants', ctrlConversation.getConversationWithUserIdOrCreateIfDoesntExist);

// messages
router.post('/messages', ctrlMessage.addNewMessage);
router.get('/messages', ctrlMessage.getMessageById);
router.get('/messages/conversation', ctrlMessage.getMessagesByConversationId);

// Users
router.get('/users', ctrlUser.getUsers);
router.get('/users/id', ctrlUser.getUserById);
router.get('/users/ids', ctrlUser.getUsersByIds);

module.exports = router;