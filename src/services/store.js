const store = require('../models/store');

function search(data) {
  const query = {
    ...data,
    name: { $regex: data.name || '', $options: 'i' }
  };
  return store.find(query).select('-products');
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