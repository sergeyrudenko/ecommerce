var mongoose = require('mongoose');

UserSchema = mongoose.Schema ({
  id: { type: String, default: 0 },
  login: { type: String, default: '' },
  password: { type: String, default: '' },
  token: { type: String, default: 0 },
}, { versionKey: false });


module.exports = mongoose.model('user', UserSchema);
