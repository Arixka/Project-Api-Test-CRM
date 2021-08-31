"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateImage = void 0;

var validateImage = (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
    return res.status(400).json({
      msg: 'Must upload an image'
    });
  }

  next();
};

exports.validateImage = validateImage;