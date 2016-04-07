'use strict';

module.exports = function(app) {
	// Routing logic
    var users = require('../../app/controllers/users.server.controller');
    var directory = require('../../app/controllers/directory.server.controller');

    app.route('/directory').get(users.requiresLogin, directory.list);
};
