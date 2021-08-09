const mongoose = require('../core/mongodb');

const collection = 'store';

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  district: { type: String, required: true },
  street: { type: String, required: true },
  number: { type: Number, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  products: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
    category: { type: mongoose.Types.ObjectId, ref: 'category' },
  }]
});

module.exports = mongoose.model(collection, schema, collection);