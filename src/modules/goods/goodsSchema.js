const mongoose = require('mongoose');

GoodsSchema = mongoose.Schema({
  id: { type: String, default: 0 },
  price: { type: Number, default: 0 },
  name: { type: String, default: 'Unnamed article' },
  description: { type: String, default: 'Empty' },
  gift: { type: Object, default: {
    id: '0',
    condition: 'Empy',
  }},
  sale: {type: Number, default: 0 },
  rating: {type: Number, default: 0 },
  characteristics: { type: Array, default: [] },
  reviews: { type: Array, default: [] },
  customFields: { type: Array, default: [] },
}, { versionKey: false });


module.exports = mongoose.model('goods', GoodsSchema);
