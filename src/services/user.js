const jwt = require('jsonwebtoken');
const user = require('../models/user');
const hash = require('../services/hash');
const { METHOD } = require('../services/hash');

function create(data) {
  const query = {
    ...data,
    password: hash.encrypt(METHOD.SHA_256, data.password),
    email: data.email.toLowerCase(),
  };
  return user.create(query);
}

function getUserByEmail(email) {
  return user.findOne({ email: email.toLowerCase() });
}

async function generateToken(email, password) {
  const currentUser = await getUserByEmail(email);
  const hashing = hash.encrypt(METHOD.SHA_256, password);
  if (!currentUser || currentUser.password !== hashing) return Promise.reject('Invalid User Information');
  return jwt.sign({ _id: currentUser._id }, process.env.TOKEN_KEY, { expiresIn: process.env.TOKEN_EXPIRE });
}

function getByToken(token) {
  try {
    const { _id } = jwt.verify(token, process.env.TOKEN_KEY);
    return user.findOne({ _id }).populate('store', '-products');
  } catch {
    return Promise.reject('Invalid User Information');
  }
}

module.exports = {
  create,
  generateToken,
  getByToken,
};