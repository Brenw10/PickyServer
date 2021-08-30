const express = require('express');
const user = require('../services/user');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/admin');
const { celebrate, Joi, errors, Segments } = require('celebrate');

const router = express.Router();

router.get('/user/search',
  celebrate({
    [Segments.QUERY]: Joi.object({
      email: Joi.string().empty(''),
    }),
  }),
  auth, isAdmin,
  (req, res) =>
    user.search(req.query)
      .then(result => res.send(result))
      .catch(err => res.status(400).send(err))
);

router.post('/user',
  celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  (req, res) =>
    user.create(req.body)
      .then(result => res.send(result))
      .catch(err => res.status(400).send(err))
);

router.post('/user/:_user/store',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      _user: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object({
      _store: Joi.string().required(),
    }),
  }),
  auth, isAdmin,
  (req, res) =>
    user.setStore(req.params._user, req.body._store)
      .then(result => res.send(result))
      .catch(err => res.status(400).send(err))
);

router.get('/user/myself', auth, (_, res) => res.send(res.locals.user));

router.use(errors());

module.exports = router;