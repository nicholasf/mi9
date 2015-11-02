var bunyan          = require('bunyan'),
    conf            = require('./../conf'),
    env             = conf.env,
    fs              = require('fs');

var LOG_DIR;

if (conf.isProduction()) {
    LOG_DIR = '/var/log/app_engine/custom_logs/task.log';
} else {
    LOG_DIR = '/tmp/task.log';
}

var log = bunyan.createLogger({
    name: 'coding-task',
    streams: [
        {
            level: 'debug',
            stream: process.stdout
        },
        {
            level: 'debug',
            path: LOG_DIR
        }
    ]
});

module.exports = log;