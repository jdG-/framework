'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Logger = mongoose.model('Logger'),
    _ = require('lodash');

/**
 * Create a Logger
 */
exports.create = function(req, res) {
    var logger = new Logger(req.body);

    logger.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(logger);
        }
    });
};

/**
 * List of Loggers
 */
exports.list = function(req, res) {
    Logger.find().sort('created').populate('user').exec(function (err, logs) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(logs);
        }
    });
};
