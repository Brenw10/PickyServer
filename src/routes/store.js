const express = require('express');
const store = require('../entities/store');
const product = require('../entities/product');

const router = express.Router();

router.get('/store/search', (req, res) =>
  store.search(req.query)
    .then(result => res.send(result))
    .catch(err => res.status(400).send(err))
);

router.get('/store/:_id/product/search', (req, res) =>
  product.getByName(req.params._id, req.query.name)
    .then(result => res.send(result))
    .catch(err => res.status(400).send(err))
);

router.get('/store/:_id', (req, res) =>
  store.get(req.params._id)
    .then(result => res.send(result))
    .catch(err => res.status(400).send(err))
);

module.exports = router;