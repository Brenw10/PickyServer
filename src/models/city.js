const mongoose = require('../core/mongodb');

const collection = 'city';

const schema = new mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model(collection, schema, collection);