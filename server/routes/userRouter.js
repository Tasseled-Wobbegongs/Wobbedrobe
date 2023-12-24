const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController.js');
const cookieController = require('../controllers/cookieController.js');
const sessionController = require('../controllers/sessionController.js');

router.post(
  '/login',
  userController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.isLoggedIn,
  (req, res) => {
    console.log('POST /user/login route hit');
    res.status(200).json({});
  }
);

router.post(
  '/signup',
  userController.createUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    console.log('POST /user/signup route hit');
    res.status(200).json({});
  }
);

router.delete('/delete', (req, res) => {
  console.log('DELETE /user/delete route hit');
  res.status(200).json({});
});

router.get('/all', userController.getAllUsers, (req, res) => {
  res.status(200).json({});
});

module.exports = router;
