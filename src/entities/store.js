const store = require('../models/store');

function getAllFromCity(city) {
  return store.find({ city });
}

function getByName(name) {
  return store.find({ name: { $regex: new RegExp(name, 'i') } });
}

function get(_id) {
  return store.find({ _id });
}

function getDistinctCity() {
  return store.find().distinct('city');
}

module.exports = {
  getAllFromCity,
  get,
  getByName,
  getDistinctCity,
};