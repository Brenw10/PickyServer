const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

const FOLDER = {
  IMAGE: 'public/images/',
};

async function getBase64ImageSaved(base64) {
  const filepath = FOLDER.IMAGE + uuidv4() + '.png';
  await fs.mkdir(FOLDER.IMAGE, { recursive: true });
  await fs.writeFile(filepath, base64, { encoding: 'base64' });
  return filepath;
}

module.exports = {
  getBase64ImageSaved,
};