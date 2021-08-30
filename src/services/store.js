const store = require('../models/store');

function search({ name, city, minProducts }) {
  return store.aggregate([
    { $match: minProducts > 0 ? { [`products.${minProducts - 1}`]: { $exists: true } } : {} },
    { $unwind: { path: "$products", preserveNullAndEmptyArrays: true } },
    {
      $match: {
        name: { $regex: name || '', $options: 'i' },
        city: city || String,
      }
    },
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

function create(data) {
  return store.create(data);
}

module.exports = {
  get,
  getDistinctCity,
  search,
  create,
};