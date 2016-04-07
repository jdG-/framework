'use strict';

module.exports = function(app) {
    var users = require('../../app/controllers/users.server.controller');
    var logger = require('../../app/controllers/logger.server.controller');

    app.route('/logs-list')
        .get(users.requiresLogin, users.isAdmin, logger.list)
        .post(logger.create);
};