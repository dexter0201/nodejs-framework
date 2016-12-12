//'use strict'

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

function validateUniqueEmail(value, callback) {
    var User = mongoose.model('User');

    User.find({
        email: value
    }, function (err, user) {
        callback(err || user.length === 0)
    });
}

var UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email'],
        validate: [validateUniqueEmail, 'Email address is already in-use']
    },
    username: {
        type: String,
        unique: true,
        required: true
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
        required: true
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

    isAdmin: function () {
        return this.roles.indexOf('admin') > -1;
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