const mongoose = require('../core/mongodb');

const collection = 'user';

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, index: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, require: true, default: 0 },
  store: { type: mongoose.Types.ObjectId, ref: 'store' },
}, {
  toJSON: {
    transform(_, value) {
      delete value.password;
    },
  }
});

module.exports = mongoose.model(collection, schema, collection);