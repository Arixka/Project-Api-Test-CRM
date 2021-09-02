"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

require('./config/db');

var app = (0, _express.default)().use((0, _cors.default)()).use((0, _morgan.default)(process.env.NODE_ENV)).use(_express.default.urlencoded({
  extended: true
})).use(_express.default.json()).use((0, _expressFileupload.default)({
  useTempFiles: true,
  tempFileDir: '/tmp/'
})).use(require('./routes/index.routes')).use(_express.default.static('public'));
app.get('/', (req, res) => {
  res.send('Hello world');
});
app.listen(process.env.PORT, err => {
  if (err) {
    throw new Error(err);
  }

  console.info('>'.repeat(40));
  console.info('💻 \x1b[35m   Project Test Api CRM \x1b[0m');
  console.info("\uD83D\uDCE1 Server is running on PORT:", process.env.PORT);
  console.info('>'.repeat(40) + '\n');
});
var _default = app;
exports.default = _default;