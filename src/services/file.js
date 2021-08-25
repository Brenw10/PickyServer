const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const FOLDER = {
  IMAGE: 'public/images/',
};

async function getBase64ImageSaved(base64) {
  const filepath = FOLDER.IMAGE + uuidv4() + '.png';
  await fs.promises.mkdir(FOLDER.IMAGE, { recursive: true });
  await fs.promises.writeFile(filepath, base64, { encoding: 'base64' });
  return filepath;
}

async function remove(filepath, ignoreError = true) {
  try {
    return await fs.promises.unlink(filepath);
  } catch (err) {
    if (!ignoreError) return Promise.reject(err);
  }
}

module.exports = {
  getBase64ImageSaved,
  remove,
};