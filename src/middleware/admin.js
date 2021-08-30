const isAdmin = function (_, res, next) {
  if (res.locals?.user?.isAdmin) {
    next();
  } else {
    res.status(400).send('User is not an Admin');
  }
}

module.exports = isAdmin;