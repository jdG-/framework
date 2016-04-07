'use strict';

angular.module('logger').controller('LoggerController', ['$scope', '$http', '$location', 'Authentication', 'DTOptionsBuilder',
    function($scope, $http, $location, Authentication, DTOptionsBuilder) {

        var dir = this;

        dir.dtOptions = DTOptionsBuilder.newOptions().withOption('aaSorting', [0, 'dsc']);

        var log = {
            user: Authentication.user._id,
            action: 'view logs on: ' + $location.path()
        };

        $http.post('/logs-list', log).success(function () {
            $http.get('/logs-list').success(function (res) {
                dir.logs = res;
            }).error(function (err) {
                dir.error = err;
            });
        });
    }
]);
