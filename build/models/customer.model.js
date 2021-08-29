"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var customerSchema = new _mongoose.default.Schema({
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
  image: {
    type: String,
    default: 'https://res.cloudinary.com/dikram/image/upload/v1629986183/api-test/uqwtuiwhuzwuhehkmeua.png',
    required: true
  },
  created: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User'
  },
  modified: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User'
  }
});
customerSchema.set('toJSON', {
  transform: function transform(doc, ret) {
    ret.uid = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

var _default = _mongoose.default.model('customer', customerSchema);

exports.default = _default;