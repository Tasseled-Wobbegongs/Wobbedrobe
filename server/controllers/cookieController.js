const userController = require('../controllers/userController');
const cookieController = {};


cookieController.setCookie = (req, res, next) => {
  //responsible for extracting the username
  const { user  } = userController; 

  res.cookie('user', user);
  res.cookie('randomNum', Math.floor(Math.random() * 100));
  return next();
};


cookieController.setSSIDCookie = (req, res, next) => {

  res.cookie('ssid', res.locals.id, { httpOnly: true });

  return next();
};

module.exports = cookieController;
