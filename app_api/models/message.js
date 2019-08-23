var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    conversationId: {
        type: String,
        required: true,
    },
    sentBy: {
        type: String,
        required: true,
    },
    sentByName: {
        type: String,
        required: true,
    },
    contents: {
        type: String,
        required: true,
    }
});

mongoose.model('Message', messageSchema);