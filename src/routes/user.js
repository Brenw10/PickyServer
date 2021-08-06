const express = require('express');
const auth = require('../middleware/auth');
const user = require('../services/user');
const { celebrate, Joi, errors, Segments } = require('celebrate');

const router = express.Router();

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

router.get('/user', auth, (_, res) => res.send(res.locals.user));

router.use(errors());

module.exports = router;