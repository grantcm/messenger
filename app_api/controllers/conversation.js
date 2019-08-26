var mongoose = require('mongoose');
var Conversation = mongoose.model('Conversation');

module.exports.getConversationById = function(req, res) {
    if(!req.query.id) {
        res.status(401);
    } else {
        Conversation.findById(req.query.id)
        .exec((err, conversation) => {
            if(err) {
                res.status(500);
            } else {
                res.status(200).json(conversation);
            }
        });
    }
}

module.exports.getConversationWithUserId = function(req, res) {
    if(!req.query.id) {
        res.status(401);
    } else {
        Conversation.find({participants: { $all : ids }})
        .exec((err, conversation) => {
            if(err) {
                res.status(500);
            } else {
                res.status(200).json(conversation);
            }
        });
    }
}

/**
 * Implementation of Get Or Create that only creates a new conversation object
 * if the first query fails to find one in the database. Returns the matching
 * conversations to the requester.
 */
module.exports.getConversationWithUserIdOrCreateIfDoesntExist = function(req, res) {
    if(!req.query.ids) {
        res.status(401);
    } else {
        const ids = JSON.parse(req.query.ids).map(id => id._id);
        Conversation.find({participants: { $all : ids }})
        .exec((err, conversation) => {
            if(err) {
                res.status(500);
            } else if (conversation.length === 0) {
                let newConversation = new Conversation();
                newConversation.participants = ids;
                Conversation.create(newConversation, (err) => {
                    if (err) {
                        res.status(500);
                    } else {
                        res.status(200).json([newConversation]);
                    }
                })
            } else {
                res.status(200).json(conversation);
            }
        });
    }
}

module.exports.addConversation = function(req, res) {
    if (!req.params.participants) {
        res.status(401);
    } else {
        let conversation = new Conversation();
        conversation.participants = req.body.participants;
        Conversation.create(conversation, (err) => {
            if (err) {
                res.status(500);
            } else {
                res.status(200).json(conversation);
            }
        });
    }
}