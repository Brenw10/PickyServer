const user = require('../models/user');

function create(data) {
  return user.create(data);
}

module.exports = {
  create,
};