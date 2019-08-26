var mongoose = require('mongoose');
var Message = mongoose.model('Message');

module.exports.getMessagesByConversationId = function (req, res) {
    if (!req.query.id) {
        res.status(401);
    } else {
        Message.find({ conversationId: { _id: req.query.id } })
            .exec((err, message) => {
                if (err) {
                    res.status(500);
                } else {
                    res.status(200).json(message);
                }
            });
    }
};

module.exports.getMessageById = function (req, res) {
    if (!req.query.id) {
        res.status(401);
    } else {
        Message.findById(req.query.id)
            .exec((err, message) => {
                if (err) {
                    res.status(500);
                } else {
                    res.status(200).json(message);
                }
            });
    }
}

module.exports.addNewMessage = function (req, res) {
    var newMessage = new Message();
    newMessage.conversationId = req.body.conversationId;
    newMessage.sentBy = req.body.sentBy;
    newMessage.contents = req.body.contents;
    Message.create(newMessage, (err) => {
        if (err) {
            res.status(500);
        } else {
            res.status(200).json("Added message.");
        }
    })
}
