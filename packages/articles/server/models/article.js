'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    created: {
        type: Date,
        'default': Date.now
    },
    title: {
        type: String,
        require: true,
        trim: true
    },
    content: {
        type: String,
        require: true,
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

ArticleSchema.path('title').validate(function (title) {
    return !!title;
}, 'Title cannot empty');

ArticleSchema.path('content').validate(function (content) {
    return !!content;
}, 'Content cannot empty');

ArticleSchema.statics.load = function (id, cb) {
    //'use strict';
    this.findOne({
        '_id': id
    }).populate('user', 'name username')
    .exec(cb);
};

mongoose.model('Article', ArticleSchema);