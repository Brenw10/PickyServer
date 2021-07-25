const express = require('express');
const category = require('../entities/category');

const router = express.Router();

router.get('/', (_, res) =>
  category.getAll()
    .then(result => res.send(result))
    .catch(err => res.status(400).send(err))
);

module.exports = router;