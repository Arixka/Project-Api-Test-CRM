"use strict";

var _express = require("express");

var _expressValidator = require("express-validator");

var _validateReq = require("../middlewares/validateReq");

var _checkAuth = require("../middlewares/checkAuth");

var _validationsMongodb = require("../helpers/validations-mongodb");

var _user = require("../controllers/user.controller");

var router = (0, _express.Router)();
router.get('/', _checkAuth.checkToken, _checkAuth.isAdmin, _user.getAllUsers);
router.get('/:userId', [_checkAuth.checkToken, _checkAuth.isAdmin, (0, _expressValidator.check)('userId', 'Id not valid').isMongoId(), (0, _expressValidator.check)('userId').custom(_validationsMongodb.idUserExist), _validateReq.validateReq], _user.getUserById);
router.post('/', [_checkAuth.checkToken, _checkAuth.isAdmin, (0, _expressValidator.check)('name', 'Name is required').not().isEmpty(), (0, _expressValidator.check)('lastName', 'LastName is required').not().isEmpty(), (0, _expressValidator.check)('email').custom(_validationsMongodb.emailExist), (0, _expressValidator.check)('email', 'E-mail invalid').isEmail(), (0, _expressValidator.check)('password', 'min. 6 characters').not().isEmpty().isLength({
  min: 6
}), (0, _expressValidator.check)('role').custom(_validationsMongodb.roleValid), _validateReq.validateReq], _user.createUser);
router.put('/:userId', [_checkAuth.checkToken, _checkAuth.isAdmin, (0, _expressValidator.check)('userId', 'Id not valid').isMongoId(), (0, _expressValidator.check)('userId').custom(_validationsMongodb.idUserExist), _validateReq.validateReq], _user.updateUserById);
router.delete('/:userId', [_checkAuth.checkToken, _checkAuth.isAdmin, (0, _expressValidator.check)('userId', 'Id not valid').isMongoId(), (0, _expressValidator.check)('userId').custom(_validationsMongodb.idUserExist), _validateReq.validateReq], _user.deleteUserById);
module.exports = router;