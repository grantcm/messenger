var mongoose = require('mongoose');

var conversationSchema = new mongoose.Schema({
    participants: {
        type: [String],
        required: true,
    }
});

mongoose.model('Conversation', conversationSchema);