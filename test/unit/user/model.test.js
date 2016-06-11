var should = require('should'),
    app = require('../../../server'),
    mongoose = require('mongoose');

describe('<Unit Test>', function () {

    describe('Model User: ', function () {
        var User = mongoose.model('User'),
            user;

        beforeEach(function (done) {
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });
            done();
        });

        afterEach(function (done) {
            done();
        });

        describe('Method Save', function () {
            it('Should be able to save without problem', function (done) {
                return user.save(function (err, user) {
                    should.not.exist(err);
                    done();
                });
            });
        });

        describe('Should be able to show an error if try to save without name', function (done) {
            user.name = '';
            return user.save(function (err, user) {
                should.exist(err);
                done();
            });
        });

    });
});

