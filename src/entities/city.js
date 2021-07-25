const city = require('../models/city');

function getAll() {
  return city.find();
}

module.exports = {
  getAll,
};