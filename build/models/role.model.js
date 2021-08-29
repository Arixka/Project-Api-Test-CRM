"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var roleSchema = new _mongoose.default.Schema({
  role: {
    type: String,
    uppercase: true,
    required: true
  }
});

var _default = _mongoose.default.model('role', roleSchema);

exports.default = _default;