"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteCustomerById = exports.updateCustomerById = exports.getCustomerById = exports.getAllCustomers = exports.createCustomer = void 0;

var _customer = _interopRequireDefault(require("../models/customer.model"));

var _excluded = ["created", "modified"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * @route Post /customers/{id}
 * @access Admin User
 * @returns customer
 */
var createCustomer = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      var {
        name,
        lastName,
        phone,
        image
      } = req.body;
      var customer = yield (0, _customer.default)({
        name,
        lastName,
        phone,
        image
      });
      var userAuth = req.userAuth;
      customer.created = userAuth.id;
      var newCustomer = yield customer.save();
      res.status(201).send({
        msg: 'New customer registered',
        newCustomer
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        msg: error
      });
    }
  });

  return function createCustomer(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * @route Get /customers
 * @access Admin User
 * @returns customers
 */


exports.createCustomer = createCustomer;

var getAllCustomers = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    //TODO paginado
    try {
      var customers = yield _customer.default.find();
      res.status(200).json(customers);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        msg: error
      });
    }
  });

  return function getAllCustomers(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * @route Get /customers/id
 * @access Admin USER
 * @returns customer
 */


exports.getAllCustomers = getAllCustomers;

var getCustomerById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      var customer = yield _customer.default.findById(req.params.userId);
      res.status(200).json(customer);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        msg: error
      });
    }
  });

  return function getCustomerById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * @route PUT /customers/id
 * @access Admin User
 * @returns customer
 */


exports.getCustomerById = getCustomerById;

var updateCustomerById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    try {
      var _req$body = req.body,
          {
        created,
        modified
      } = _req$body,
          restCustomer = _objectWithoutProperties(_req$body, _excluded);

      var customer = yield _customer.default.findByIdAndUpdate(req.params.userId, restCustomer, {
        new: true
      });
      customer.modified = req.userAuth.id;
      var customerUpdate = yield customer.save();
      res.status(201).send({
        msg: 'Customer updated',
        customerUpdate
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        msg: error
      });
    }
  });

  return function updateCustomerById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * @route Delete /customers/id
 * @access Admin User
 * @returns customer
 */


exports.updateCustomerById = updateCustomerById;

var deleteCustomerById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    try {
      var customer = yield _customer.default.findByIdAndDelete(req.params.userId);
      res.status(200).json({
        msg: 'Customer deleted',
        customer
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        msg: error
      });
    }
  });

  return function deleteCustomerById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteCustomerById = deleteCustomerById;