const express = require('express');
const product = require('../entities/product');
const { celebrate, Joi, errors, Segments } = require('celebrate');

const router = express.Router();

router.get('/product/category/:category/search',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      category: Joi.string().required(),
    }),
    [Segments.QUERY]: Joi.object({
      city: Joi.string().empty(''),
      'products.name': Joi.string().empty(''),
    }),
  }),
  (req, res) =>
    product.searchByCategory(req.params.category, req.query)
      .then(result => res.send(result))
      .catch(err => res.status(400).send(err))
);

router.use(errors());

module.exports = router;