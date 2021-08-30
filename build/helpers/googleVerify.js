"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.googleVerify = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var {
  OAuth2Client
} = require('google-auth-library');

var client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

var googleVerify = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (idToken) {
    var ticket = yield client.verifyIdToken({
      idToken,
      audience: process.env.OAUTH_CLIENT_ID
    });
    var {
      name,
      email,
      picture: image
    } = ticket.getPayload();
    return {
      name,
      email,
      image
    };
  });

  return function googleVerify(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.googleVerify = googleVerify;