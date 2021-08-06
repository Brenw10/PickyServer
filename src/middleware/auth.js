const express = require('express');
const user = require('../services/user');

const router = express.Router();

router.use(async function (req, res, next) {
  try {
    const currentUser = await user.getByToken(req.headers.authorization)
    res.locals.user = currentUser;
    next();
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;