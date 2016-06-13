var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    created: {
        type: Date,
        'default': Date.now
    },
    title: {
        type: String,
        'default': '',
        trim: true
    },
    content: {
        type: String,
        'default': '',
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

ArticleSchema.path('title').validate(function (title) {
    return title.length;
}, 'Title cannot empty');

ArticleSchema.statics.load = function (id, cb) {
    //'use strict';
    this.findOne({
        '_id': id
    }).populate('user', 'name username')
    .exec(cb);
};

mongoose.model('Article', ArticleSchema);