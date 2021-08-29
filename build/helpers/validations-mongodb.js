"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.idCustomerExist = exports.idUserExist = exports.emailExist = exports.roleValid = void 0;

var _role = _interopRequireDefault(require("../models/role.model"));

var _user = _interopRequireDefault(require("../models/user.model"));

var _customer = _interopRequireDefault(require("../models/customer.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var roleValid = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (role) {
    var roleExists = yield _role.default.findOne({
      role
    });

    if (!roleExists) {
      throw new Error("This role not exist");
    }
  });

  return function roleValid(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.roleValid = roleValid;

var emailExist = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (email) {
    var emailExist = yield _user.default.findOne({
      email
    });
    if (emailExist) throw new Error('E-mail already exists');
  });

  return function emailExist(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.emailExist = emailExist;

var idUserExist = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (id) {
    var userExist = yield _user.default.findById(id);
    if (!userExist) throw new Error('No user exists with that id');
  });

  return function idUserExist(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.idUserExist = idUserExist;

var idCustomerExist = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (id) {
    var custExist = yield _customer.default.findById(id);
    if (!custExist) throw new Error('No customer exists with that id');
  });

  return function idCustomerExist(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.idCustomerExist = idCustomerExist;