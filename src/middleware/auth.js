const user = require('../services/user');

async function authentication(req, res, next) {
  try {
    const currentUser = await user.getByToken(req.headers.authorization);
    if (!currentUser) throw 'Inexistent User';
    res.locals.user = currentUser;
    next();
  } catch (err) {
    res.status(400).send(err);
  }
}

module.exports = authentication;