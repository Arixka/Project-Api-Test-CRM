"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var {
  MONGO_URL_ATLAS,
  MONGO_URL_ATLAS_TEST,
  NODE_ENV
} = process.env;
var connectionUrl = NODE_ENV === 'test' ? MONGO_URL_ATLAS_TEST : MONGO_URL_ATLAS;

_mongoose.default.connect(connectionUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(db => {
  if (NODE_ENV !== 'dev') {
    console.log('Connected to %s', db.connection.name);
  }
}).catch(err => {
  console.error('App starting error:', err.message);
  process.exit(1);
});