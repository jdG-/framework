'use strict';

//Setting up route
angular.module('directory').config(['$stateProvider',
	function($stateProvider) {
		// Directory state routing
		$stateProvider.
		state('list-directory', {
			url: '/list-directory',
			templateUrl: 'modules/directory/views/list-directory.client.view.html'
		});
	}
]);