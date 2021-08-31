"use strict";

var _express = require("express");

var _user = _interopRequireDefault(require("./user.routes"));

var _auth = _interopRequireDefault(require("./auth.routes"));

var _customer = _interopRequireDefault(require("./customer.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.use('/auth', _auth.default);
router.use('/user', _user.default);
router.use('/customer', _customer.default);
module.exports = router;