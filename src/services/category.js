const category = require('../models/category');

function getAll() {
  return category.find();
}

module.exports = {
  getAll,
};