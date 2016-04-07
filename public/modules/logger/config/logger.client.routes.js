'use strict';

//Setting up route
angular.module('logger').config(['$stateProvider',
	function($stateProvider) {
		// Logger state routing
		$stateProvider.
		state('logger', {
			url: '/logger',
			templateUrl: 'modules/logger/views/logger.client.view.html'
		});
	}
]);