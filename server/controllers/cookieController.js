const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
  res.cookie('ssid', req.session.userId, { httpOnly: true });
  return next();
};

module.exports = cookieController;
