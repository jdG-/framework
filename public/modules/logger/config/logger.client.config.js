'use strict';

// Logger module config
angular.module('logger').run(['Menus',
	function(Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Logger', 'logger', 'item', 'logger', false, ['admin']);
	}
]);