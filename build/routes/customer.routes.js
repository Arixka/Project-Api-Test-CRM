"use strict";

var _express = require("express");

var _expressValidator = require("express-validator");

var _validateReq = require("../middlewares/validateReq");

var _validateImage = require("../middlewares/validateImage");

var _checkAuth = require("../middlewares/checkAuth");

var _validationsMongodb = require("../helpers/validations-mongodb");

var _customer = require("../controllers/customer.controller");

var router = (0, _express.Router)();
router.get('/', _checkAuth.checkToken, _customer.getAllCustomers);
router.get('/:userId', [_checkAuth.checkToken, (0, _checkAuth.authorizedRole)('ADMIN', 'USER'), (0, _expressValidator.check)('userId', 'Id not valid').isMongoId(), (0, _expressValidator.check)('userId').custom(_validationsMongodb.idCustomerExist), _validateReq.validateReq], _customer.getCustomerById);
router.post('/', [_checkAuth.checkToken, (0, _checkAuth.authorizedRole)('ADMIN', 'USER'), _validateImage.validateImage, (0, _expressValidator.check)('name', 'Name is required').not().isEmpty(), (0, _expressValidator.check)('lastName', 'LastName is required').not().isEmpty(), (0, _expressValidator.check)('phone', 'Phone is required').not().isEmpty(), (0, _expressValidator.check)('phone').custom(_validationsMongodb.customerExist), (0, _expressValidator.check)('phone', 'Must be a phone number').isMobilePhone(), _validateReq.validateReq], _customer.createCustomer);
router.put('/:userId', [_checkAuth.checkToken, (0, _checkAuth.authorizedRole)('ADMIN', 'USER'), (0, _expressValidator.check)('userId', 'Id not valid').isMongoId(), (0, _expressValidator.check)('userId').custom(_validationsMongodb.idCustomerExist), _validateReq.validateReq], _customer.updateCustomerById);
router.delete('/:userId', [_checkAuth.checkToken, (0, _checkAuth.authorizedRole)('ADMIN', 'USER'), (0, _expressValidator.check)('userId', 'Id not valid').isMongoId(), (0, _expressValidator.check)('userId').custom(_validationsMongodb.idCustomerExist), _validateReq.validateReq], _customer.deleteCustomerById);
module.exports = router;