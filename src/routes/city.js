const express = require('express');
const store = require('../services/store');

const router = express.Router();

router.get('/city', (_, res) =>
  store.getDistinctCity()
    .then(result => res.send(result))
    .catch(err => res.status(400).send(err))
);

module.exports = router;