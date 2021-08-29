"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploader = void 0;

var _cloudinary = _interopRequireDefault(require("../config/cloudinary"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uploader = req => {
  return new Promise((resolve, reject) => {
    var dUri = new Datauri();
    var image = dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

    _cloudinary.default.uploader.upload(image.content, (err, url) => {
      if (err) return reject(err);
      return resolve(url);
    });
  });
};

exports.uploader = uploader;