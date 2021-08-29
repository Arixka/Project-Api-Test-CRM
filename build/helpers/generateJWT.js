"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateJWT = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generateJWT = uid => {
  return new Promise((resolve, reject) => {
    var payload = {
      uid
    };

    _jsonwebtoken.default.sign(payload, process.env.SECRET_JWT, {
      expiresIn: '6h'
    }, (err, token) => {
      if (err) {
        console.log(err);
        reject('Failed to generate token');
      } else {
        resolve(token);
      }
    });
  });
};

exports.generateJWT = generateJWT;