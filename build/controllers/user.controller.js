"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;

var _user = _interopRequireDefault(require("../models/user.model"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _excluded = ["role"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * @route Post /users/{id}
 * @access Admin
 * @returns user
 */
var createUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      var {
        name,
        lastName,
        email,
        password,
        role
      } = req.body;

      var salt = _bcryptjs.default.genSaltSync();

      var passHash = _bcryptjs.default.hashSync(password, salt);

      var user = new _user.default({
        name,
        lastName,
        email,
        password: passHash,
        role
      });
      var newUser = yield user.save();
      res.status(201).send({
        msg: 'New user registered',
        newUser
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        msg: error
      });
    }
  });

  return function createUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * @route Get /users
 * @access Admin
 * @returns users
 */


exports.createUser = createUser;

var getAllUsers = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    //TODO paginado
    try {
      var users = yield _user.default.find();
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        msg: error
      });
    }
  });

  return function getAllUsers(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * @route Get /users/id
 * @access Admin
 * @returns user
 */


exports.getAllUsers = getAllUsers;

var getUserById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      var user = yield _user.default.findById(req.params.userId);
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        msg: error
      });
    }
  });

  return function getUserById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * @route PUT /users/id
 * @access Admin
 * @returns user
 */


exports.getUserById = getUserById;

var updateUserById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    try {
      var _req$body = req.body,
          {
        role
      } = _req$body,
          restUser = _objectWithoutProperties(_req$body, _excluded);

      if (req.body.password) {
        var salt = _bcryptjs.default.genSaltSync();

        restUser.password = _bcryptjs.default.hashSync(req.body.password, salt);
      }

      var user = yield _user.default.findByIdAndUpdate(req.params.userId, restUser, {
        new: true
      });
      res.status(201).send({
        msg: 'User updated',
        user
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        msg: error
      });
    }
  });

  return function updateUserById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * @route Delete /users/id
 * @access Admin
 * @returns user
 */


exports.updateUserById = updateUserById;

var deleteUserById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    try {
      var user = yield _user.default.findByIdAndDelete(req.params.userId);
      res.status(200).json({
        msg: 'User deleted',
        user
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        msg: error
      });
    }
  });

  return function deleteUserById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteUserById = deleteUserById;