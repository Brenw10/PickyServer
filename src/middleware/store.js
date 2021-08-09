function isUserAllowedToStore(req, res, next) {
  try {
    if (!res.locals.user.store._id.equals(req.params._id)) throw 'User has no permission to Store';
    next();
  } catch (err) {
    res.status(400).send(err);
  }
}

module.exports = isUserAllowedToStore;