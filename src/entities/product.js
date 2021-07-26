const store = require('../models/store');
const mongoose = require('mongoose');

function getDistinctCity() {
  return store.find().distinct('city');
}

function getByName(_id, name) {
  return store.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(_id) } },
    { $unwind: '$products' },
    { $match: { 'products.name': { $regex: new RegExp(name, 'i') } } },
    { $group: { _id: '$_id', products: { $push: '$products' } } },
  ]);
}

module.exports = {
  getDistinctCity,
  getByName,
};