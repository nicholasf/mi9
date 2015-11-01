var env     = process.env.NODE_ENV || 'development',
    _       = require('lodash'),
    envConf = require('./env.json');

var conf = _.merge(envConf['default'], envConf[env]);

conf.env = env;

var envs = ['production', 'test', 'development'];

envs.forEach(function(envName) {
    var envFuncName = envName.charAt(0).toUpperCase() + envName.slice(1);
    conf['is' + envFuncName] = function() {
        return env === envName;
    };
});

module.exports = conf;
