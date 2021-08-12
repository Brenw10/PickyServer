const store = require('../models/store');

function search(data) {
  const query = {
    ...data,
    name: { $regex: data.name || '', $options: 'i' },
    'products.quantity': { $gte: data['products.quantity'] },
  };
  return store.aggregate([
    { $unwind: '$products' },
    { $match: query },
    { $group: { _id: '$_id', doc: { $first: "$$ROOT" }, 'products': { $push: '$products' } } },
    { $replaceRoot: { newRoot: { $mergeObjects: ['$doc', { products: '$products' }] } } },
  ]);
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