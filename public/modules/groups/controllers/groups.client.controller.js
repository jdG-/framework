'use strict';

// Groups controller
angular.module('groups').controller('GroupsController', ['$scope', '$http', '$stateParams', '$location', 'Authentication', 'Groups',

	function($scope, $http, $stateParams, $location, Authentication, Groups) {

		if (Authentication.user && Authentication.user.roles.indexOf('admin') === -1) {
			$location.path('/');
		} else if (Authentication.user === '' || Authentication.user === undefined || Authentication.user === null) {
			$location.path('/signin');
		}

		$scope.authentication = Authentication;

		// Create new Group
		$scope.create = function() {
			// Create new Group object
			var group = new Groups ({
				name: this.name
			});

			// Redirect after save
            var log = {
                user: Authentication.user._id,
                action: 'create group on: ' + $location.path()
            };

            $http.post('/logs-list', log).success(function () {
                group.$save(function (response) {
                    $location.path('groups/' + response._id);

                    // Clear form fields
                    $scope.name = '';
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            });
		};

		// Remove existing Group
		$scope.remove = function(group) {
            var log = {
                user: Authentication.user._id,
                action: 'delete group on: ' + $location.path()
            };

            $http.post('/logs-list', log).success(function () {
                if (group) {
                    group.$remove();

                    for (var i in $scope.groups) {
                        if ($scope.groups [i] === group) {
                            $scope.groups.splice(i, 1);
                        }
                    }
                } else {
                    $scope.group.$remove(function () {
                        $location.path('groups');
                    });
                }
            });
		};

		// Update existing Group
		$scope.update = function() {
			var group = $scope.group;

            var log = {
                user: Authentication.user._id,
                action: 'update group on: ' + $location.path()
            };

            $http.post('/logs-list', log).success(function () {
                group.$update(function () {
                    $location.path('groups/' + group._id);
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            });
		};

		// Find a list of Groups
		$scope.find = function() {
            var log = {
                user: Authentication.user._id,
                action: 'view list of groups on: ' + $location.path()
            };

            $http.post('/logs-list', log).success(function () {
                $scope.groups = Groups.query();
            });
		};

		// Find existing Group
		$scope.findOne = function() {
            var log = {
                user: Authentication.user._id,
                action: 'view group on: ' + $location.path()
            };

            $http.post('/logs-list', log).success(function () {
                $scope.group = Groups.get({
                    groupId: $stateParams.groupId
                });
            });
		};
	}
]);