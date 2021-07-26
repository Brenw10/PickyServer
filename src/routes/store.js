const express = require('express');
const product = require('../entities/product');
const store = require('../entities/store');

const router = express.Router();

router.get('/', (_, res) =>
  store.getAll()
    .then(result => res.send(result))
    .catch(err => res.status(400).send(err))
);

router.get('/:_id', (req, res) =>
  store.get(req.params._id)
    .then(result => res.send(result))
    .catch(err => res.status(400).send(err))
);

router.get('/:_id/product/:name', (req, res) =>
  product.search(req.params._id, req.params.name)
    .then(result => res.send(result))
    .catch(err => res.status(400).send(err))
);

router.get('/product/city', (_, res) =>
  product.getDistinctCity()
    .then(result => res.send(result))
    .catch(err => res.status(400).send(err))
);

module.exports = router;