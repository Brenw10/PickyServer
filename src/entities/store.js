const store = require('../models/store');

function search(query) {
  if (query.name) query.name = { $regex: new RegExp(query.name, 'i') };
  return store.find(query);
}

function get(_id) {
  return store.findOne({ _id });
}

function getDistinctCity() {
  return store.aggregate([
    { $group: { _id: "$city" } },
    { $project: { name: '$_id' } },
  ]);
}

module.exports = {
  get,
  getDistinctCity,
  search,
};