const mongoose = require('../core/mongodb');

const collection = 'category';

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model(collection, schema, collection);