'use strict';

// Configuring the Articles module
angular.module('directory').run(['Menus',
    function(Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Directory', 'list-directory', 'item', 'list-directory');
    }
]);
