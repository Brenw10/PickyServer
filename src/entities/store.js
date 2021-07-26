const store = require('../models/store');

function getAllFromCity(city) {
  return store.find({ city });
}

function get(_id) {
  return store.find({ _id });
}

module.exports = {
  getAllFromCity,
  get,
};