//'use strict'

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');


var validatePresenceOf = function (value) {
    return (this.provider && this.provider !== 'local') || value.length;
};

var UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        validate: [validatePresenceOf, 'Name cannot be blank']
    },
    email: {
        type: String,
        required: true,
        validate: [validatePresenceOf, 'Email cannot be blank'],
        match: [/.+\@.+\..+/, 'Please enter a valid email']
    },
    username: {
        type: String,
        unique: true,
        validate: [validatePresenceOf, 'Username cannot be blank']
    },
    roles: {
        type: Array,
        'default': ['authenticated']
    },
    salt: String,
    provider: {
        type: String,
        'default': 'local'
    },
    hashed_password: {
        type: String,
        validate: [validatePresenceOf, 'Password cannot be blank']
    },
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
    if (this.isNew
        && this.provider === 'local'
        && this.password
        && !this.password.length) {
        return next(new Error('Invalid password'));
    }

    next();
});

UserSchema.methods = {
    hasRole: function (role) {
        return (this.roles.indexOf('admin') > -1 || this.roles.indexOf(role) > -1);
    },

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