"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateReq = void 0;

var _expressValidator = require("express-validator");

var validateReq = (req, res, next) => {
  var errors = (0, _expressValidator.validationResult)(req);
  if (!errors.isEmpty()) return res.status(422).send(errors);
  next();
};

exports.validateReq = validateReq;