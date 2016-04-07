'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('list', {
			url: '/user/list',
			templateUrl: 'modules/users/views/userlist.client.view.html'
		}).
		state('update', {
			url: '/user/:userId',
			templateUrl: 'modules/users/views/userupdate.client.view.html'
		});
	}
]);
