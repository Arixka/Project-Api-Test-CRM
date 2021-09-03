"use strict";

var _express = require("express");

var _expressValidator = require("express-validator");

var _validateReq = require("../middlewares/validateReq");

var _checkAuth = require("../middlewares/checkAuth");

var validateDB = _interopRequireWildcard(require("../helpers/validations-mongodb"));

var userCrtl = _interopRequireWildcard(require("../controllers/user.controller"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = (0, _express.Router)();
router.get('/', _checkAuth.checkToken, _checkAuth.isAdmin, userCrtl.getAllUsers);
router.get('/:userId', [_checkAuth.checkToken, _checkAuth.isAdmin, (0, _expressValidator.check)('userId', 'Id not valid').isMongoId(), (0, _expressValidator.check)('userId').custom(validateDB.idUserExist), _validateReq.validateReq], userCrtl.getUserById);
router.post('/', [_checkAuth.checkToken, _checkAuth.isAdmin, (0, _expressValidator.check)('name', 'Name is required').not().isEmpty(), (0, _expressValidator.check)('lastName', 'LastName is required').not().isEmpty(), (0, _expressValidator.check)('email').custom(validateDB.emailExist), (0, _expressValidator.check)('email', 'E-mail invalid').isEmail(), (0, _expressValidator.check)('password', 'min. 6 characters').not().isEmpty().isLength({
  min: 6
}), (0, _expressValidator.check)('role').custom(validateDB.roleValid), _validateReq.validateReq], userCrtl.createUser);
router.put('/:userId', [_checkAuth.checkToken, _checkAuth.isAdmin, (0, _expressValidator.check)('userId', 'Id not valid').isMongoId(), (0, _expressValidator.check)('userId').custom(validateDB.idUserExist), _validateReq.validateReq], userCrtl.updateUserById);
router.delete('/:userId', [_checkAuth.checkToken, _checkAuth.isAdmin, (0, _expressValidator.check)('userId', 'Id not valid').isMongoId(), (0, _expressValidator.check)('userId').custom(validateDB.idUserExist), _validateReq.validateReq], userCrtl.deleteUserById);
module.exports = router;