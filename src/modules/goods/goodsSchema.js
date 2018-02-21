const mongoose = require('mongoose');

GoodsSchema = mongoose.Schema({
  id: { type: String, default: 0 },
  price: { type: Number, default: 0 },
  name: { type: String, default: 'Unnamed article' },
  description: { type: String, default: 'Empty' },
  characteristics: { type: String, default: 'Empty' },
}, { versionKey: false });


module.exports = mongoose.model('goods', GoodsSchema);
