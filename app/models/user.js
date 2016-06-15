//'use strict'

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    crypto = require('crypto'),
    _ = require('underscore');

var UserSchema = new Schema({
    name: String,
    email: String,
    username: String,
    salt: String,
    provider: String,
    hashed_password: String,
    facebook: {}
});

UserSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

// Pre-save hook
UserSchema.pre('save', function (next) {
    if (!this.isNew) {
        return next();
    }

    if (!validatePresenceOf(this.password) && !this.provider) {
        next(new Error('Invalid password'));
    } else {
        next();
    }
});

var validatePresenceOf = function (value) {
    return value && value.length;
};

UserSchema.path('name').validate(function (name) {
    // If you are authenticating by any of the oauth strategies, don't validate
    if (!this.provider) {
        return true;
    }

    return name.length;
}, 'Name cannot be blank');

UserSchema.path('email').validate(function (email) {
    // if you are authenticating by any of the oauth strategies, don't validate
    if (!this.provider) {
        return true;
    }

    return email.length;
}, 'Email cannot be blank');

UserSchema.path('username').validate(function (username) {
    // If you are authenticating by any of the oauth strategies, don't validate
    if (!this.provider) {
        return true;
    }

    return username.length;
}, 'Username cannot be blank');

UserSchema.path('hashed_password').validate(function (hashed_password) {
    // If you are authenticating by any of the oauth strategies, don't validate
    if (!this.provider) {
        return true;
    }

    return hashed_password.length;
}, 'Password cannot be blank');

UserSchema.methods = {

    makeSalt: function () {
        return crypto.randomBytes(16).toString('base64');
    },

    encryptPassword: function (password) {
        if (!password || !this.salt) {
            return '';
        }

        var salt = new Buffer(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
        //return bcrypt.hashSync(password, 10);
    },

    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
        //return bcrypt.compareSync(plainText, this.hashed_password);
    }
};

mongoose.model('User', UserSchema);