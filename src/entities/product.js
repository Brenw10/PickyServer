const store = require('../models/store');
const mongoose = require('mongoose');

function searchByStore(_id, query) {
  if (query['products.name']) query['products.name'] = { $regex: query['products.name'], $options: 'i' }
  return store.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(_id) } },
    { $unwind: '$products' },
    { $match: query },
    { $group: { _id: '$_id', products: { $push: '$products' } } },
  ]).then(result => result?.[0]?.products || []);
}

function searchByCategory(category, query) {
  if (query['products.name']) query['products.name'] = { $regex: query['products.name'], $options: 'i' }
  return store.aggregate([
    { $unwind: '$products' },
    { $match: { 'products.category': mongoose.Types.ObjectId(category) } },
    { $match: query },
    { $group: { _id: '$products.category', products: { $push: '$products' } } },
  ]).then(result => result?.[0]?.products || []);
}

module.exports = {
  searchByStore,
  searchByCategory,
};