const store = require('../models/store');
const mongoose = require('mongoose');

function searchByStore(_id, query) {
  query = { ...query, 'products.name': { $regex: query['products.name'] || '', $options: 'i' } };
  console.log(query)
  return store.aggregate([
    { $unwind: '$products' },
    { $match: { _id: mongoose.Types.ObjectId(_id) } },
    { $match: query },
    { $replaceRoot: { newRoot: { $mergeObjects: ['$products', { store: '$$ROOT' }] } } },
    { $project: { 'store.products': 0 } },
  ]);
}

function searchByCategory(category, query) {
  query = { ...query, 'products.name': { $regex: query['products.name'] || '', $options: 'i' } };
  return store.aggregate([
    { $unwind: '$products' },
    { $match: { 'products.category': mongoose.Types.ObjectId(category) } },
    { $match: query },
    { $replaceRoot: { newRoot: { $mergeObjects: ['$products', { store: '$$ROOT' }] } } },
    { $project: { 'store.products': 0 } },
  ]);
}

module.exports = {
  searchByStore,
  searchByCategory,
};