"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth0 = exports.login = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _generateJWT = require("../helpers/generateJWT");

var _user = _interopRequireDefault(require("../models/user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var login = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      var {
        email,
        password
      } = req.body;
      var user = yield _user.default.findOne({
        email
      });
      if (!_bcryptjs.default.compareSync(password, user.password)) return res.status(401).json({
        msg: 'Wrong password'
      });
      var token = yield (0, _generateJWT.generateJWT)(user._id);
      res.status(200).json({
        user,
        token
      });
    } catch (error) {
      res.status(401).send({
        msg: "User does not exist ".concat(error)
      });
    }
  });

  return function login(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.login = login;

var auth0 = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var {
      id_token
    } = req.body;

    try {
      var googleUser = yield googleVerify(id_token);
      res.json({
        msg: 'Login with google corrected',
        id_token
      });
    } catch (error) {
      res.json({
        msg: 'E-mail not valid'
      });
    }
  });

  return function auth0(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.auth0 = auth0;