'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
    LdapStrategy = require('passport-ldapauth').Strategy,
    User = require('mongoose').model('User');

module.exports = function() {
    // Use ldap strategy
    passport.use(new LdapStrategy({
            server: {
                url: 'ldaps://ldap.42.fr:636',
                bindCredentials: '{{password}}',
                searchBase: 'ou=paris,ou=people,dc=42,dc=fr',
                searchFilter: '(uid={{username}})',
                searchAttributes: ['givenName', 'sn', 'uid', 'alias']
            }
        },
        function(userLdap, done) {

            User.findOne({
                username: userLdap.uid
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    user = new User({
                        firstName: userLdap.givenName,
                        lastName: userLdap.sn,
                        displayName: userLdap.givenName + ' ' + userLdap.sn,
                        email: userLdap.alias[0],
                        username: userLdap.uid,
                        provider: 'ldapauth'
                    });

                    User.count({}, function (err, nb) {
                        if (!err && nb === 0) {
                            user.roles.push('admin');
                        }
                        // Save the user
                        user.save(function (err) {
                            if (err) {
                                return done(err);
                            } else {
                                return done(null, user);
                            }
                        });
                    });
                } else {
                    return done(null, user);
                }
            });
        }
    ));
};
