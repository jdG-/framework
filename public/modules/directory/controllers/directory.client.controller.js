'use strict';

angular.module('directory').controller('DirectoryController', ['$scope', '$http', '$location', 'DTOptionsBuilder', 'Authentication',
	function($scope, $http, $location, DTOptionsBuilder, Authentication) {

        var dir = this;

        dir.dtOptions = DTOptionsBuilder.newOptions().withOption('aaSorting', [3, 'asc']);

        // Directory controller logic
        var log = {
            user: Authentication.user._id,
            action: 'view directory on: ' + $location.path()
        };

        $http.post('/logs-list', log).success(function () {
            $http.get('/directory').success(function (res) {
                dir.students = res;
            }).error(function (err) {
                dir.error = err;
            });
        });
	}
]);
