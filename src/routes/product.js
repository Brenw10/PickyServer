const express = require('express');
const product = require('../entities/product');

const router = express.Router();

router.get('/product/category/:category/search', (req, res) =>
  product.search(req.query, req.params.category)
    .then(result => res.send(result))
    .catch(err => res.status(400).send(err))
);

module.exports = router;