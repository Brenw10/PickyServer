const crypto = require('crypto');

const METHOD = {
  SHA_256: 'sha256',
};

function encrypt(method, value) {
  return crypto.createHash(method).update(value).digest('base64');
}

module.exports = {
  METHOD,
  encrypt,
};