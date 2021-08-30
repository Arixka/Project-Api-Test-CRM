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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var app = (0, _express.default)().use((0, _cors.default)()).use((0, _morgan.default)(process.env.NODE_ENV)).use(_express.default.urlencoded({
  extended: true
})).use(_express.default.json()).use(require('./routes/index.routes')).use(_express.default.static('public'));

require('./config/server');

app.get('/', (req, res) => {
  res.send('Hello world');
});
app.listen(process.env.PORT, err => {
  if (err) {
    throw new Error(err);
  }

  console.info('>'.repeat(40));
  console.info('💻  Project Test Api CRM');
  console.info("\uD83D\uDCE1 Server is running on PORT:", process.env.PORT);
  console.info('>'.repeat(40) + '\n');
});
var _default = app;
exports.default = _default;