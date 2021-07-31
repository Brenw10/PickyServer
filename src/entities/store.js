const store = require('../models/store');

function search(query) {
  query = { ...query, name: { $regex: query.name || '', $options: 'i' } };
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