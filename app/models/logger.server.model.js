'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Logger Schema
 */
var LoggerSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    action: {
        type: String,
        default: '',
        required: 'Please fill Log action',
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Logger', LoggerSchema);