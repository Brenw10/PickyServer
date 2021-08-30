const express = require('express');
const store = require('../services/store');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/admin');
const { celebrate, Joi, errors, Segments } = require('celebrate');

const router = express.Router();

router.get('/store/search',
  celebrate({
    [Segments.QUERY]: Joi.object({
      name: Joi.string().empty(''),
      city: Joi.string().empty(''),
      minProducts: Joi.number().integer().default(0),
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

router.post('/store',
  celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().required(),
      district: Joi.string().required(),
      street: Joi.string().required(),
      number: Joi.number().integer().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
    }),
  }),
  auth, isAdmin,
  (req, res) =>
    store.create(req.body)
      .then(result => res.send(result))
      .catch(err => res.status(400).send(err))
);

router.use(errors());

module.exports = router;