var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;
const saltSize = 16;
const jwtExpiry = 1;

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    favoriteAnimal: {
        type: String,
        required: true,
    },
    hash: String,
    salt: String
});

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(saltSize).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
}

userSchema.methods.validPassword = function(password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return hash === this.hash;
}

userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + jwtExpiry);
    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        favoriteAnimal: this.favoriteAnimal,
        expiry: parseInt(expiry.getTime() / 1000)
    }, secret);
}

mongoose.model('User', userSchema);