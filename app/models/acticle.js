var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ActicleSchema = new Schema({
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

ActicleSchema.statics = {
    load: function (id, cb) {
        //'use strict';
        
        this.findOne({ '_id': id }).populate('user').exec(cb);
    }
};

mongoose.model('Acticle', ActicleSchema);