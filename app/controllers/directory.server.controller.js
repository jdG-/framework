'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    ldap = require('ldapjs'),
    _ = require('lodash'),
    config = require('../../config/secret');

/**
 * List of Directories
 */
exports.list = function(req, res) {
    var client = ldap.createClient({
        url: 'ldaps://ldap.42.fr:636'
    });

    var opt = {
        scope: 'sub',
        attributes: ['uid', 'givenName', 'sn', 'mobile', 'alias'],
        timeLimit: 600
    };

    client.bind('uid=' + config.user + ',ou=september,ou=2013,ou=paris,ou=people,dc=42,dc=fr', config.password, function (err) {
        if (!err) {
            client.search('ou=paris,ou=people,dc=42,dc=fr', opt, function (err, data) {
                if (!err) {

                    var students = [];

                    data.on('searchEntry', function(entry) {
                        var match = entry.object.dn.match(/uid=[a-z\-]{3,8},ou=(september|august|july),ou=([0-9]{4})/);
                        if (match)
                        {
                            students.push({
                                firstName: entry.object.givenName,
                                lastName: entry.object.sn,
                                username: entry.object.uid,
                                phoneNumber: entry.object.mobile,
                                year: match[2],
                                month: match[1],
                                picture: 'http://cdn.42.fr/userprofil/' + entry.object.uid + '.jpg'
                            });
                        }
                    });
                    data.on('searchReference', function(referral) {
                        console.log('referral: ' + referral.uris.join());
                    });
                    data.on('error', function(err) {
                        client.unbind();
                        res.status(400).send({message: 'ldap error'});
                    });
                    data.on('end', function(result) {
                        client.unbind();
                        res.jsonp(students);
                    });
                }
                else {
                    res.status(400).send({message: 'ldap Search error'});
                }
            });
        }
        else {
            res.status(400).send({message: 'ldap Bind error'});
        }
    });
};
