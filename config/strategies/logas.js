'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	LogasStrategy = require('passport-local').Strategy,
	User = require('mongoose').model('User');

module.exports = function() {
	// Use local strategy

	passport.use(new LogasStrategy({
			usernameField: 'username',
			passwordField: 'password'
		},
		function(username, password, done) {

			User.findOne({
				username: username
			}, function(err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false, {
						message: 'Unknown user or invalid password'
					});
				}
                user.logas = true;
				return done(null, user);
			});
		}
	));
};
