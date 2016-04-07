'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$cookies', 'Authentication', 'Menus', 'gettextCatalog', '$http', '$location',
	function($scope, $cookies, Authentication, Menus, gettextCatalog, $http, $location) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');
		$scope.languages = [ {
			isoCode: 'en',
			countryCode: 'gb'
		}, {
			isoCode: 'fr',
			countryCode: 'fr'
		}];

		gettextCatalog.debug = true;
		var getLang = $cookies.get('lang') ? $cookies.get('lang') : 'en';
		gettextCatalog.setCurrentLanguage(getLang);

		$scope.setLanguage = function (lang) {
			$cookies.put('lang', lang);
			gettextCatalog.setCurrentLanguage(lang);
		};

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

        //$scope.signOut = function () {
            //if (Authentication.oldUser) {
            //    var credentials = {
            //        username: Authentication.oldUser,
            //        password: 'aaaa'
            //    };
            //    var log = {
            //        user: Authentication.user._id,
            //        action: 'log back : ' + Authentication.oldUser + ' on ' + $location.path()
            //    };
            //
            //    $http.post('/logs-list', log).success(function () {
            //        $http.post('/auth/logas', credentials).success(function (response) {
            //            $scope.authentication.user = response;
            //            Authentication.user = response;
            //            delete Authentication.oldUser;
            //            $location.path('/');
            //        }).error(function (response) {
            //            $scope.error = response.message;
            //        });
            //    });
            //} else {
            //    $http.get('/auth/signout');
            //    $location.path('/');
            //}
        //};
	}
]);
