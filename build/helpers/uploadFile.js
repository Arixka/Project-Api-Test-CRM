"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadFile = void 0;

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var {
  v4: uuidv4
} = require('uuid');

var uploadFile = function uploadFile(files) {
  var validExtensions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['png', 'jpg', 'gif', 'jpeg'];
  var folder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return new Promise((resolve, reject) => {
    var {
      image
    } = files;
    var extension = image.mimetype.split('/')[1];

    if (!validExtensions.includes(extension)) {
      return reject("Only ".concat(validExtensions.join(', '), " are accepted"));
    }

    var nameTemp = "".concat(uuidv4(), ".").concat(extension);

    var uploadPath = _path.default.join(__dirname, '../uploads', folder, nameTemp);

    image.mv(uploadPath, err => {
      if (err) {
        console.log(err);
        reject('Error saving image');
      }

      resolve(nameTemp);
    });
  });
};

exports.uploadFile = uploadFile;