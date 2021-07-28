const store = require('../models/store');
const mongoose = require('mongoose');

function getByName(_id, name) {
  return store.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(_id) } },
    { $unwind: '$products' },
    { $match: { 'products.name': { $regex: new RegExp(name, 'i') } } },
    { $group: { _id: '$_id', products: { $push: '$products' } } },
  ]).then(result => result[0].products);
}

function search(query, category) {
  return store.aggregate([
    { $match: query },
    { $unwind: '$products' },
    { $match: { 'products.category': mongoose.Types.ObjectId(category) } },
    { $group: { _id: '$products.category', products: { $push: '$products' } } },
  ]).then(result => result[0].products);
}

module.exports = {
  getByName,
  search,
};