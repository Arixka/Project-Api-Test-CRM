"use strict";

var _express = require("express");

var _expressValidator = require("express-validator");

var _validateReq = require("../middlewares/validateReq");

var _validateImage = require("../middlewares/validateImage");

var _checkAuth = require("../middlewares/checkAuth");

var customerCtrl = _interopRequireWildcard(require("../controllers/customer.controller"));

var validateDB = _interopRequireWildcard(require("../helpers/validations-mongodb"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = (0, _express.Router)();
router.get('/', _checkAuth.checkToken, customerCtrl.getAllCustomers);
router.get('/:userId', [_checkAuth.checkToken, (0, _checkAuth.authorizedRole)('ADMIN', 'USER'), (0, _expressValidator.check)('userId', 'Id not valid').isMongoId(), (0, _expressValidator.check)('userId').custom(validateDB.idCustomerExist), _validateReq.validateReq], customerCtrl.getCustomerById);
router.post('/', [_checkAuth.checkToken, (0, _checkAuth.authorizedRole)('ADMIN', 'USER'), _validateImage.validateImage, (0, _expressValidator.check)('name', 'Name is required').not().isEmpty(), (0, _expressValidator.check)('lastName', 'LastName is required').not().isEmpty(), (0, _expressValidator.check)('phone', 'Phone is required').not().isEmpty(), (0, _expressValidator.check)('phone').custom(validateDB.customerExist), (0, _expressValidator.check)('phone', 'Must be a phone number').isMobilePhone(), _validateReq.validateReq], customerCtrl.createCustomer);
router.put('/:userId', [_checkAuth.checkToken, (0, _checkAuth.authorizedRole)('ADMIN', 'USER'), (0, _expressValidator.check)('userId', 'Id not valid').isMongoId(), (0, _expressValidator.check)('userId').custom(validateDB.idCustomerExist), _validateReq.validateReq], customerCtrl.updateCustomerById);
router.delete('/:userId', [_checkAuth.checkToken, (0, _checkAuth.authorizedRole)('ADMIN', 'USER'), (0, _expressValidator.check)('userId', 'Id not valid').isMongoId(), (0, _expressValidator.check)('userId').custom(validateDB.idCustomerExist), _validateReq.validateReq], customerCtrl.deleteCustomerById);
module.exports = router;