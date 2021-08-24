function isAllowedUserStore(param) {
  return function (req, res, next) {
    try {
      if (!res.locals?.user?.store?._id.equals(req.params?.[param])) throw 'User has no permission to Store';
      next();
    } catch (err) {
      res.status(400).send(err);
    }
  }
}

module.exports = isAllowedUserStore;