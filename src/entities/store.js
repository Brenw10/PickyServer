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
  return store.aggregate([
    { $group: { _id: "$city" } },
    { $project: { name: '$_id' } },
  ]);
}

module.exports = {
  getAllFromCity,
  get,
  getByName,
  getDistinctCity,
};