'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Group Schema
 */
var GroupSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Group name',
		unique: 'This group already exists',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Group', GroupSchema);
