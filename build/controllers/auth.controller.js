"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.googleLogin = exports.login = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _generateJWT = require("../helpers/generateJWT");

var _googleVerify = require("../helpers/googleVerify");

var _user = _interopRequireDefault(require("../models/user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * @route post /auth/login
 * @access User
 * @returns User Token
 */
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
/**
 * @route post /auth/google
 * @access User
 * @returns userUpdate Token
 */


exports.login = login;

var googleLogin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    try {
      var {
        id_token
      } = req.body;
      var {
        name,
        email,
        image
      } = yield (0, _googleVerify.googleVerify)(id_token);
      var user = yield _user.default.findOne({
        email
      });
      if (!user) throw new Error('Unauthorized user');
      var data = {
        image,
        google: true
      };
      var userUpdate = yield _user.default.findByIdAndUpdate(user._id, data, {
        new: true
      });
      var token = yield (0, _generateJWT.generateJWT)(user._id);
      res.status(201).json({
        msg: 'Login with google corrected',
        userUpdate,
        token
      });
    } catch (error) {
      res.status(401).send({
        msg: "Token not valid ".concat(error)
      });
    }
  });

  return function googleLogin(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

exports.googleLogin = googleLogin;