const store = require('../models/store');
const mongoose = require('mongoose');
const file = require('../services/file');

function search({ _store, name, city, category }) {
  const query = {
    _id: _store ? mongoose.Types.ObjectId(_store) : mongoose.Types.ObjectId,
    city: city || String,
    'products.name': { $regex: name || '', $options: 'i' },
    'products.category': category ? mongoose.Types.ObjectId(category) : mongoose.Types.ObjectId,
  };
  return store.aggregate([
    { $unwind: '$products' },
    { $match: query },
    { $replaceRoot: { newRoot: { $mergeObjects: ['$products', { store: '$$ROOT' }] } } },
    { $project: { 'store.products': 0 } },
  ]);
}

async function create(_store, data) {
  const product = {
    ...data,
    image: await file.getBase64ImageSaved(data.image),
  };
  return store.updateOne({ _id: _store }, { $push: { products: product } });
}

function remove(_store, _product) {
  return store.updateOne({ _id: _store }, { $pull: { 'products': { _id: _product } } });
}

module.exports = {
  search,
  create,
  remove,
};