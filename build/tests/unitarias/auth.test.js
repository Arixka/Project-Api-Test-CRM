"use strict";

var _user = _interopRequireDefault(require("../../models/user.model"));

var _supertest = _interopRequireDefault(require("supertest"));

var _express = _interopRequireDefault(require("express"));

var _app = require("../../app");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tokenLoggedIn;
var userObj = {
  email: 'authUser@gmail.com',
  password: '215421'
};
describe('Post auth/login', () => {
  it('Should require authorization', done => {
    (0, _supertest.default)(_app.app).post('/auth/login').expect(401).end((err, res) => {
      tokenLoggedIn = res.body.token;
      if (err) return done(err);
      done();
    });
  });
  it('responds with json', function (done) {
    (0, _supertest.default)(_app.app).get('/user').send({
      email: 'authUser@gmail.com',
      password: '215421'
    }).set('Accept', 'application/json').expect('Content-Type', /json/).expect(200).end(function (err, res) {
      if (err) return done(err);
      return done();
    });
  });
});