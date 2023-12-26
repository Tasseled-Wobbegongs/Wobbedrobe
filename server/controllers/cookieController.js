const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
  res.cookie('ssid', req.session.user_id, { httpOnly: true });
  return next();
};

module.exports = cookieController;
