'use strict';


angular.module('core').controller('HomeController', ['$scope', '$http', '$location','Authentication',
	function($scope, $http, $location, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

        var log = {
            user: Authentication.user._id,
            action: 'view homepage on: ' + $location.path()
        };

        $http.post('/logs-list', log);
	}
]);