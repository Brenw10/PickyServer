const express = require('express');
const product = require('../entities/product');

const router = express.Router();

router.get('/product/city', (_, res) =>
  product.getDistinctCity()
    .then(result => res.send(result))
    .catch(err => res.status(400).send(err))
);

module.exports = router;