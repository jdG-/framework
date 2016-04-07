'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication', 'gettextCatalog',
	function($scope, $http, $location, Authentication, gettextCatalog) {
		$scope.authentication = Authentication;

        var log = {
            user: Authentication.user._id,
            action: 'view authentication page on : ' + $location.path()
        };

        $http.post('/logs-list', log);
		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signin = function() {
			if ($scope.signinForm.username.$viewValue !== undefined && $scope.signinForm.password.$viewValue !== undefined&& $scope.signinForm.password.$error.minlength === undefined && $scope.signinForm.username.$error.required === undefined) {

                $http.post('/auth/signin', $scope.credentials).success(function (response) {
                    // If successful we assign the response to the global user model
                    $scope.authentication.user = response;
                    var log = {
                        user: $scope.authentication.user._id,
                        action: 'authentication on: ' + $location.path()
                    };

                    $http.post('/logs-list', log);
                    // And redirect to the index page
                    $location.path('/');
                }).error(function (response) {
                    $scope.error = response.message;
                });
			} else if ($scope.signinForm.username.$error.required === true || $scope.signinForm.username.$viewValue === undefined) {
				$scope.error = gettextCatalog.getString('An username is required');
			} else if ($scope.signinForm.password.$error.minlength === true || $scope.signinForm.password.$viewValue === undefined) {
				$scope.error = gettextCatalog.getString('Password should be longer');
			}
		};
	}
]);
