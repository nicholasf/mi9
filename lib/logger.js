var winston = require('winston'),
    conf    = require('./../conf');

// Requiring `winston-gae` will expose
// `winston.transports.GoogleAppEngine`
// and
// `winston.config.GoogleAppEngine.levels`
require('winston-gae');

var transports = [
    new winston.transports.GoogleAppEngine({
        // capture logs at emergency level and above (all levels)
        level: 'emergency'
    })]

if (!conf.isProduction()) {
    transports.push(new (winston.transports.Console)())
}

var logger = new winston.Logger({
    levels: winston.config.GoogleAppEngine.levels,
    transports: transports
});

module.exports = logger;
