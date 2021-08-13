const store = require('../models/store');
const mongoose = require('mongoose');
const file = require('../services/file');

function search(data) {
  const query = {
    ...data,
    _id: data._id ? mongoose.Types.ObjectId(data._id) : mongoose.Types.ObjectId,
    'products.name': { $regex: data['products.name'] || '', $options: 'i' },
    'products.quantity': { $gte: data['products.quantity'] },
  };
  return store.aggregate([
    { $unwind: '$products' },
    { $match: query },
    { $replaceRoot: { newRoot: { $mergeObjects: ['$products', { store: '$$ROOT' }] } } },
    { $project: { 'store.products': 0 } },
  ]);
}

async function create(_id, data) {
  const products = {
    ...data,
    image: await file.saveBase64Image(data.image),
  };
  return store.updateOne({ _id }, { $push: { products } });
}

function update(_id, productId, { quantity }) {
  return store.updateOne(
    { _id, 'products._id': productId },
    { $set: { 'products.$.quantity': quantity } },
  );
}

module.exports = {
  search,
  create,
  update,
};