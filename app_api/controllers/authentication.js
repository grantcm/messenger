var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.login = function (req, res) {
    //TODO validate req has required fields
    passport.authenticate('local', function (err, user, info) {
        var token;

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if (user) {
            token = user.generateJwt();
            req.session.user = user._id;
            res.status(200);
            res.json({
                "token": token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);
};

module.exports.register = function (req, res) {
    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;
    user.favoriteAnimal = req.body.favoriteAnimal;
    user.setPassword(req.body.password);
    //TODO check user doesn't exist already
    User.create(user, function (err) {
        if (err) {
            res.status(500);
        } else {
            let token;
            token = user.generateJwt();
            req.session.user = user._id;
            res.status(200).json({
                "token": token
            });
        }
    });
}