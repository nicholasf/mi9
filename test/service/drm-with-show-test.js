var service     = require('./../../service/drm-with-shows'),
    app         = require("./../../app"),
    request     = require('supertest'),
    expect      = require('chai').expect,
    fixture     = require('./../fixture/sample-request.json'),
    malformedData;

var test = function(body, done) {
    request(app)
        .post('/')
        .set('Content-type', 'application/json')
        .send(body)
        .end(done);
};

describe('using the supplied fixture', function() {
    it('parses the supplied JSON into the correct response', (done) => {
        test(fixture, (err, res) => {
            expect(err).to.be.null;
            expect(res.body).to.not.be.null;
            expect(res.status).to.equal(200);
            expect(res.body.response).to.not.be.null;
            done();
        });
    });

    it('produces an exact match to the supplied response fixture', (done) => {
        var suppliedResponse = require('./../fixture/sample-response.json');

        test(fixture, (err, res) => {
            var local = JSON.stringify(res.body);
            var supplied = JSON.stringify(suppliedResponse);
            console.log(supplied)
            expect(local).to.equal(supplied);
            done();
        });
    });
});

describe('error handling', () => {
    it('handles an empty document', (done) => {
        test('', (err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.error).to.equal('Missing payload')
            done();
        });
    });

    it('handles a malformed document (as explained in the task)', (done) => {
        test(malformedData, (err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.error).to.equal('Could not decode request: JSON parsing failed')
            done();
        });
    });
});

//just a short excerpt from the fixture that is syntactically broken
malformedData = '{\"payload\": [{\"country\": \"UK\",\"description\": \"What\'s life like when you have enough children to field your own football team?\"'
