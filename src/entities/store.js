const store = require('../models/store');

function getAll() {
  return store.find();
}

function get(_id) {
  return store.find({ _id });
}

module.exports = {
  getAll,
  get,
};