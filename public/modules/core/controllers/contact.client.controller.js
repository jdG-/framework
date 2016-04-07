'use strict';

angular.module('core').controller('ContactController', ['$scope', '$http', '$location','Authentication', 'gettextCatalog',
	function($scope, $http, $location, Authentication, gettextCatalog) {
		$scope.auth = Authentication;
		$scope.success = false;
		$scope.error = false;

        var log = {
            user: Authentication.user._id,
            action: 'view contact page on: ' + $location.path()
        };

        $http.post('/logs-list', log);

		if ($scope.auth.user) {
			$scope.contact = {
				name: $scope.auth.user.displayName,
				email: $scope.auth.user.email,
				message: $scope.message
			};
		} else {
			$scope.contact = {
				name: $scope.name,
				email: $scope.email,
				message: $scope.message
			};
		}

		$scope.sendMsg = function () {
            var log = {
                user: Authentication.user._id,
                action: 'send message on: ' + $location.path()
            };

            $http.post('/logs-list', log).success(function () {
                $http.post('/contact', $scope.contact).success(function () {
                    $scope.success = true;
                }).error(function () {
                    $scope.error = true;
                });
            });
		};
	}
]);
