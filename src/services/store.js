const store = require('../models/store');

function search({ name, city }) {
  const query = {
    name: { $regex: name || '', $options: 'i' },
    city: city || String,
  };
  return store.aggregate([
    { $unwind: '$products' },
    { $match: query },
    { $group: { _id: '$_id', doc: { $first: "$$ROOT" }, 'products': { $push: '$products' } } },
    { $replaceRoot: { newRoot: { $mergeObjects: ['$doc', { products: '$products' }] } } },
  ]);
}

function get(_store) {
  return store.findOne({ _id: _store });
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