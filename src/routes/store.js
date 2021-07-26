const express = require('express');
const store = require('../entities/store');
const product = require('../routes/product');

const router = express.Router();

router.get('/city', (_, res) =>
  store.getDistinctCity()
    .then(result => res.send(result))
    .catch(err => res.status(400).send(err))
);

router.get('/city/:city', (req, res) =>
  store.getAllFromCity(req.params.city)
    .then(result => res.send(result))
    .catch(err => res.status(400).send(err))
);

router.get('/name/:name', (req, res) =>
  store.getByName(req.params.name)
    .then(result => res.send(result))
    .catch(err => res.status(400).send(err))
);

router.get('/:_id', (req, res) =>
  store.get(req.params._id)
    .then(result => res.send(result))
    .catch(err => res.status(400).send(err))
);

router.use(product);

module.exports = router;