const mongoose = require('../core/mongodb');
const hash = require('../services/hash');
const { METHOD } = require('../services/hash');

const collection = 'user';

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, index: true, unique: true },
  password: { type: String, required: true },
  store: { type: mongoose.Types.ObjectId, ref: 'store' },
}, {
  toJSON: {
    transform(_, value) {
      delete value.password;
    },
  }
});

schema.pre('save', function (next) {
  this.password = hash.encrypt(METHOD.SHA_256, this.password);
  next();
});

module.exports = mongoose.model(collection, schema, collection);