const express = require('express');
const path = require('path');
const Controller = require('./controllers/WobbedrobeController.js');
const userController = require('./controllers/userController.js');
const cookieController = require('./controllers/cookieController.js');
const sessionController = require('./controllers/sessionController.js');
const bcrypt = require('bcrypt');


require('dotenv').config();


const app = express();
const PORT = 3000; 


app.use(express.json());


app.post('/user/signup', userController.createUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
  return res.status(200).json({});
});

app.get('/user/login', userController.verifyUser, cookieController.setSSIDCookie, sessionController.isLoggedIn, (req, res) => {
  return res.status(200).json({});
});

app.delete('user/delete', (req, res) => {
  return res.status(200).json({});
});

// Unknown route handler
app.use('*', (req,res) => {
  res.status(404).send('Not Found');
});

// Global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});
  

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

module.exports = app; 