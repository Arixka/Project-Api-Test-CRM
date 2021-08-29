"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

_mongoose.default.connect(process.env.MONGO_URL_ATLAS, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(db => {
  if (process.env.NODE_ENV !== 'dev') {
    console.log('App is running ... \n');
    console.log('Connected to %s', db.connection.host);
    console.log('\nPress CTRL + C to stop the process. \n');
  }
}).catch(err => {
  console.error('App starting error:', err.message);
  process.exit(1);
});