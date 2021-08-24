const store = require('../models/store');
const mongoose = require('mongoose');
const file = require('../services/file');

function search(data) {
  const query = {
    ...data,
    _id: data._id ? mongoose.Types.ObjectId(data._id) : mongoose.Types.ObjectId,
    'products.name': { $regex: data['products.name'] || '', $options: 'i' },
    'products.category': data['products.category'] ? mongoose.Types.ObjectId(data['products.category']) : mongoose.Types.ObjectId,
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