"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['ADMIN', 'USER'],
    default: 'USER',
    required: true
  }
});
userSchema.set('toJSON', {
  transform: function transform(doc, ret) {
    ret.uid = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
  }
});

var _default = _mongoose.default.model('user', userSchema);

exports.default = _default;