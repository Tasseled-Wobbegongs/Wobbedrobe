const mongoose = require('mongoose');
const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  //responsible for extracting the username
  const { isMatch } = res.locals; 
  console.log('cookieController.setCookie isMatch:', isMatch)
  
  res.cookie('isMatch', isMatch);
  const ranNum = Math.floor(Math.random() * 100);
  res.cookie('secret', ranNum);
  // console.log(ranNum)
  return next();
};


cookieController.setSSIDCookie = (req, res, next) => {
  const { username } = req.body;

  // TODO: fix error handlers in cookieController.setSSIDCookie
  if(!username) {
    return next('ERROR in userController.verifyUser: Please check login information again')
  };
  
  if(username === undefined) {
    return next('Error in userController.verifyUser: No user id');
  }
  res.cookie('ssid', username, { httpOnly: true });
  // console.log('cookieController.setSSIDCookie', username )
  return next();
};

module.exports = cookieController;
