const express = require('express');
const product = require('../services/product');
const auth = require('../middleware/auth');
const isAllowedUserStore = require('../middleware/store');
const { celebrate, Joi, errors, Segments } = require('celebrate');

const router = express.Router();

router.get('/product/search',
  celebrate({
    [Segments.QUERY]: Joi.object({
      _store: Joi.string().empty(''),
      city: Joi.string().empty(''),
      name: Joi.string().empty(''),
      category: Joi.string().empty(''),
    }),
  }),
  (req, res) =>
    product.search(req.query)
      .then(result => res.send(result))
      .catch(err => res.status(400).send(err))
);

router.post('/store/:_store/product',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      _store: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required(),
      image: Joi.string().required(),
      category: Joi.string().required(),
    }),
  }),
  auth, isAllowedUserStore('_store'),
  (req, res) =>
    product.create(req.params._store, req.body)
      .then(result => res.send(result))
      .catch(err => res.status(400).send(err))
);

router.delete('/store/:_store/product/:_product',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      _store: Joi.string().required(),
      _product: Joi.string().required(),
    }),
  }),
  auth, isAllowedUserStore('_store'),
  (req, res) =>
    product.remove(req.params._store, req.params._product)
      .then(result => res.send(result))
      .catch(err => res.status(400).send(err))
);

router.use(errors());

module.exports = router;