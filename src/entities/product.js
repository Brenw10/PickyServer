const store = require('../models/store');

function getDistinctCity() {
  return store.find().distinct('city');
}

module.exports = {
  getDistinctCity,
};