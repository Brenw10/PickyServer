const express = require('express');
const store = require('../services/store');
const product = require('../services/product');
const auth = require('../middleware/auth');
const storePermission = require('../middleware/store');
const { celebrate, Joi, errors, Segments } = require('celebrate');

const router = express.Router();

router.get('/store/:_id/product/search',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      _id: Joi.string().required(),
    }),
    [Segments.QUERY]: Joi.object({
      'products.name': Joi.string().empty(''),
      'products.quantity': Joi.number().default(0),
    }),
  }),
  (req, res) =>
    product.searchByStore(req.params._id, req.query)
      .then(result => res.send(result))
      .catch(err => res.status(400).send(err))
);

router.post('/store/:_id/product',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      _id: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required(),
      image: Joi.string().required(),
      quantity: Joi.number().required(),
      category: Joi.string().required(),
    }),
  }),
  auth, storePermission,
  (req, res) =>
    product.create(req.params._id, req.body)
      .then(result => res.send(result))
      .catch(err => res.status(400).send(err))
);

router.put('/store/:_id/product/:product',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      _id: Joi.string().required(),
      product: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object({
      quantity: Joi.number().required(),
    }),
  }),
  auth, storePermission,
  (req, res) =>
    product.update(req.params._id, req.params.product, req.body)
      .then(result => res.send(result))
      .catch(err => res.status(400).send(err))
);

router.get('/store/search',
  celebrate({
    [Segments.QUERY]: Joi.object({
      name: Joi.string().empty(''),
      city: Joi.string(),
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