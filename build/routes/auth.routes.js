"use strict";

var _express = require("express");

var _expressValidator = require("express-validator");

var _auth = require("../controllers/auth.controller");

var _validateReq = require("../middlewares/validateReq");

var router = (0, _express.Router)();
router.post('/login', [(0, _expressValidator.check)('email', 'E-mail is required').not().isEmpty(), (0, _expressValidator.check)('email', 'E-mail invalid').isEmail(), (0, _expressValidator.check)('password', 'El password es obligatorio').not().isEmpty(), _validateReq.validateReq], _auth.login);
router.post('/google', [(0, _expressValidator.check)('id_token', 'Id_token is required').not().isEmpty(), _validateReq.validateReq], _auth.googleLogin);
module.exports = router;