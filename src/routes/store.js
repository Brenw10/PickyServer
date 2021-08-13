const express = require('express');
const store = require('../services/store');
const { celebrate, Joi, errors, Segments } = require('celebrate');

const router = express.Router();

router.get('/store/search',
  celebrate({
    [Segments.QUERY]: Joi.object({
      name: Joi.string().empty(''),
      city: Joi.string().empty(''),
      'products.quantity': Joi.number().default(0).empty(''),
    }),
  }),
  (req, res) =>
    store.search(req.query)
      .then(result => res.send(result))
      .catch(err => res.status(400).send(err))
);

router.get('/store/:_id',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      _id: Joi.string().required(),
    }),
  }),
  (req, res) =>
    store.get(req.params._id)
      .then(result => res.send(result))
      .catch(err => res.status(400).send(err))
);

router.use(errors());

module.exports = router;