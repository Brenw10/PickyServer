const store = require('../models/store');
const mongoose = require('mongoose');
const file = require('../services/file');

function search({ _store, name, city, category, _product }) {
  const query = {
    _id: _store ? mongoose.Types.ObjectId(_store) : mongoose.Types.ObjectId,
    city: city || String,
    'products._id': _product ? mongoose.Types.ObjectId(_product) : mongoose.Types.ObjectId,
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

async function remove(_store, _product) {
  const product = await search({ _store, _product });
  file.remove(product?.[0]?.image);
  return store.updateOne({ _id: _store }, { $pull: { 'products': { _id: _product } } });
}

module.exports = {
  search,
  create,
  remove,
};