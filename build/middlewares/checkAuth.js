"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authorizedRole = exports.isAdmin = exports.checkToken = void 0;

var _user = _interopRequireDefault(require("../models/user.model"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var checkToken = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    var token = req.header('token');

    if (!token) {
      return res.status(401).json({
        msg: 'You have no permissions'
      });
    } else {
      try {
        var {
          uid
        } = _jsonwebtoken.default.verify(token, process.env.SECRET_JWT);

        var user = yield _user.default.findById(uid);
        if (!user) return res.status(401).json({
          msg: 'User not exist'
        });
        req.userAuth = user;
        next();
      } catch (error) {
        res.status(400).json({
          msg: 'Error checkToken ' + error
        });
      }
    }
  });

  return function checkToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.checkToken = checkToken;

var isAdmin = (req, res, next) => {
  if (!req.userAuth) {
    return res.status(401).json({
      msg: 'This token not valid'
    });
  }

  var {
    role
  } = req.userAuth;

  if (role !== 'ADMIN') {
    return res.status(401).json({
      msg: 'Should be admin'
    });
  }

  next();
};

exports.isAdmin = isAdmin;

var authorizedRole = function authorizedRole() {
  for (var _len = arguments.length, roles = new Array(_len), _key = 0; _key < _len; _key++) {
    roles[_key] = arguments[_key];
  }

  return (req, res, next) => {
    if (!req.userAuth) {
      return res.status(500).json({
        msg: 'You have no permissions'
      });
    }

    if (!roles.includes(req.userAuth.role)) {
      return res.status(401).json({
        msg: "you must be an authorized role"
      });
    }

    next();
  };
};

exports.authorizedRole = authorizedRole;