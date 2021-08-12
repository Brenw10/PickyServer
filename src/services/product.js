const store = require('../models/store');
const mongoose = require('mongoose');
const file = require('../services/file');

function searchByStore(_id, data) {
  const query = {
    ...data,
    'products.name': { $regex: data['products.name'] || '', $options: 'i' },
    'products.quantity': { $gte: data['products.quantity'] },
  };
  return store.aggregate([
    { $unwind: '$products' },
    { $match: { _id: mongoose.Types.ObjectId(_id) } },
    { $match: query },
    { $replaceRoot: { newRoot: { $mergeObjects: ['$products', { store: '$$ROOT' }] } } },
    { $project: { 'store.products': 0 } },
  ]);
}

function searchByCategory(category, data) {
  const query = {
    ...data,
    'products.name': { $regex: data['products.name'] || '', $options: 'i' },
    'products.quantity': { $gte: data['products.quantity'] },
  };
  return store.aggregate([
    { $unwind: '$products' },
    { $match: { 'products.category': mongoose.Types.ObjectId(category) } },
    { $match: query },
    { $replaceRoot: { newRoot: { $mergeObjects: ['$products', { store: '$$ROOT' }] } } },
    { $project: { 'store.products': 0 } },
  ]);
}

async function create(_id, data) {
  const product = {
    ...data,
    image: await file.saveBase64Image(data.image),
  };
  return store.updateOne({ _id }, { $push: { products: product } });
}

function update(_id, productId, { quantity }) {
  return store.updateOne(
    { _id, 'products._id': productId },
    { $set: { 'products.$.quantity': quantity } },
  );
}

module.exports = {
  searchByStore,
  searchByCategory,
  create,
  update,
};