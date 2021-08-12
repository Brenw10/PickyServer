const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

const folder = {
  image: 'public/images/',
};

async function saveBase64Image(base64) {
  const filepath = folder.image + uuidv4() + '.png';
  await fs.mkdir(folder.image, { recursive: true });
  await fs.writeFile(filepath, base64, { encoding: 'base64' });
  return filepath;
}

module.exports = {
  saveBase64Image,
};