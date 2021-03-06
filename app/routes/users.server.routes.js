'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function(app) {
	// User Routes
	var users = require('../../app/controllers/users.server.controller');


	app.route('/user/:userId').get(users.requiresLogin, users.read)
		.put(users.requiresLogin, users.isAdmin, users.updateAdmin)
		.delete(users.requiresLogin, users.isAdmin, users.delete);
	app.route('/admins').get(users.requiresLogin, users.getAdmins);

	// Setting up the users profile api
	app.route('/users/me').get(users.me);
	app.route('/users').get(users.list)
		.put(users.update);
	app.route('/users/accounts').delete(users.removeOAuthProvider);


	// Setting up the users authentication api
	app.route('/auth/signin').post(users.signin);
	app.route('/auth/signout').get(users.signout, users.logAs);

    // Setting up the users log as api
    app.route('/auth/logas').post(users.requiresLogin, users.isAdmin, users.logAs);

	// Setting the facebook oauth routes
	app.route('/auth/facebook').get(passport.authenticate('facebook', {
		scope: ['email']
	}));
	app.route('/auth/facebook/callback').get(users.oauthCallback('facebook'));

	// Setting the twitter oauth routes
	app.route('/auth/twitter').get(passport.authenticate('twitter'));
	app.route('/auth/twitter/callback').get(users.oauthCallback('twitter'));

	// Setting the google oauth routes
	app.route('/auth/google').get(passport.authenticate('google', {
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
		]
	}));
	app.route('/auth/google/callback').get(users.oauthCallback('google'));

	// Setting the linkedin oauth routes
	app.route('/auth/linkedin').get(passport.authenticate('linkedin'));
	app.route('/auth/linkedin/callback').get(users.oauthCallback('linkedin'));

	// Setting the github oauth routes
	app.route('/auth/github').get(passport.authenticate('github'));
	app.route('/auth/github/callback').get(users.oauthCallback('github'));

	// Finish by binding the user middleware
	app.param('userId', users.userByID);
};
