const express = require('express');
const store = require('../services/store');
const { celebrate, Joi, errors, Segments } = require('celebrate');

const router = express.Router();

router.get('/store/search',
  celebrate({
    [Segments.QUERY]: Joi.object({
      name: Joi.string().empty(''),
      city: Joi.string().empty(''),
    }),
  }),
  (req, res) =>
    store.search(req.query)
      .then(result => res.send(result))
      .catch(err => res.status(400).send(err))
);

router.get('/store/:_store',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      _store: Joi.string().required(),
    }),
  }),
  (req, res) =>
    store.get(req.params._store)
      .then(result => res.send(result))
      .catch(err => res.status(400).send(err))
);

router.use(errors());

module.exports = router;