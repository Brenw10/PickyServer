const express = require('express');
const city = require('../entities/city');

const router = express.Router();

router.get('/', (_, res) =>
  city.getAll()
    .then(result => res.send(result))
    .catch(err => res.status(400).send(err))
);

module.exports = router;