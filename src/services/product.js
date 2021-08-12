const store = require('../models/store');
const mongoose = require('mongoose');

function searchByStore(_id, query) {
  query = { ...query, 'products.name': { $regex: query['products.name'] || '', $options: 'i' } };
  return store.aggregate([
    { $unwind: '$products' },
    { $match: { _id: mongoose.Types.ObjectId(_id), 'products.quantity': { $gte: 1 } } },
    { $match: query },
    { $replaceRoot: { newRoot: { $mergeObjects: ['$products', { store: '$$ROOT' }] } } },
    { $project: { 'store.products': 0 } },
  ]);
}

function searchByCategory(category, query) {
  query = { ...query, 'products.name': { $regex: query['products.name'] || '', $options: 'i' } };
  return store.aggregate([
    { $unwind: '$products' },
    { $match: { 'products.category': mongoose.Types.ObjectId(category), 'products.quantity': { $gte: 1 } } },
    { $match: query },
    { $replaceRoot: { newRoot: { $mergeObjects: ['$products', { store: '$$ROOT' }] } } },
    { $project: { 'store.products': 0 } },
  ]);
}

function create(_id, product) {
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