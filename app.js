var express         = require('express'),
    http            = require('http'),
    conf            = require('./conf'),
    bodyParser      = require('body-parser'),
    logger          = require('./lib/logger'),
    service         = require('./service/drm-with-shows');

var express = require('express');
var app = module.exports = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((err, req, res, next) => {
    if (err.message.match(/Unexpected end of input/)) {
        return res.status(400).send({ error: 'Could not decode request: JSON parsing failed' });
    }

    return next();
});

app.post('/', service);

var server = app.listen(conf.port, function () {
    var host = server.address().address;
    var port = server.address().port;

    logger.debug('Ready: http://%s:%s', host, port);
});
