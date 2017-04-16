'use strict';

const should = require('should');

describe('#nodejscore', function () {
    var nodejscore;

    beforeEach('Before each', function () {
        nodejscore = require('nodejscore');
    });

    afterEach('After each', function () {
        nodejscore = null;
    });

    describe('#Constructor', function () {
        it('It should require nodejscore successfully', function () {
            should.doesNotThrow(function () {
                should.exist(nodejscore);
            });
        });
    });

    describe('#Basic properties', function () {
        it('It should have status funciton', function () {
            nodejscore.status.should.be.a.Function();
        });

        it('It should have config property', function () {
            nodejscore.config.should.be.a.Object();
        });

        it('It should have runInstance property', function () {
            nodejscore.runInstance.should.be.a.Function();
        });
    });

    describe('#Run app', function () {
        it('It should run app sucessfully', function () {
            should.doesNotThrow(function() {
                nodejscore.runInstance({

                }, function () {
                    console.log('callback success');
                });
            }, 'Thrown error');
        });
    });
});