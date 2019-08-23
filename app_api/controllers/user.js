var mongoose = require('mongoose');
var User = mongoose.model('User');

function cleanUserProperties(user) {
    let newUser = {
        _id: user.id,
        name: user.name,
        email: user.email,
        favoriteAnimal: user.favoriteAnimal,
    }
    return newUser;
}

module.exports.getUsers = function(req, res) {
    User.find()
    .exec((err, users) => {
        if (err) {
            res.status(500);
        } else {
            let cleanUsers = users.map(cleanUserProperties);
            res.status(200).json(cleanUsers);
        }
    });
};

module.exports.getUserById = function(req, res) {
    if(!req.params.id) {
        res.status(401);
    } else {
        User.findById(req.params.id)
        .exec((err, user) => {
            if(err) {
                res.status(500);
            } else {
                res.status(200).json(cleanUserProperties(user));
            }
        });
    }
};

module.exports.getUsersByIds = function(req, res) {
    if(!req.params.ids) {
        res.status(401);
    } else {
        let ObjectIds = req.params.ids.map(id => new ObjectId(id));
        User.find({_id: {$in: ObjectIds}})
        .exec((err, users) => {
            if (err) {
                res.status(500);
            } else {
                res.status(200).json(users.map(cleanUserProperties));
            }
        });
    }
}