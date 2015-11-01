var bunyan          = require('bunyan'),
    conf            = require('./../conf'),
    env             = conf.env,
    fs              = require('fs');

//we need to make the log level configurable per environment via config settings
//e.g. if we are in production the log level should be info or warn

const LOG_DIR = './logs';

if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR);
}

var log = bunyan.createLogger({
    name: 'coding-task',
    streams: [
        {
            level: conf.logLevel,
            stream: process.stdout            // log INFO and above to stdout
        },
        {
            level: conf.logLevel,
            path: `./logs/${conf.env}.log` // log ERROR and above to a file
        }
    ]
});

module.exports = log;