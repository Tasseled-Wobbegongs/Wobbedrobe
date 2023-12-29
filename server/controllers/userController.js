const db = require('../models/db.js');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const express = require('express'); // // put this in server to be able to use in all server files
const session = require('express-session'); // put this in server to be able to use in all server files
const Session = require('../models/sessionModel.js')
// userController would be called from server once it receives a post request then session middleware would be called to set a new session

const userController = {};

userController.createUser = async (req, res, next) => {
  const { username, password } = req.body;
  console.log('this is req.body in createUser', req.body);
  try {
    // hash the password
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    // insert the new user into the database and return user_id and username
    const queryText ='INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING user_id, username';
    const queryParams = [username, hashedPassword];
    const { rows } = await db.query(queryText, queryParams);
    console.log('completed query in userController.createUser');

    // store user_id in session
    // req.session object is used to store data that you want to keep across requests made by the same user
    // req.session.userId = rows[0].user_id;
    // console.log(
    //   'this is req.session.userId in userController.createUser',
    //   req.session.userId
    // );
    // store username in res locals
    res.locals.user = rows[0].username;

    const newSession = new Session({userId: req.session.userId});
    await newSession.save();

    // go to next middleware which would be to create session with userId
    return next();
  } catch (err) {
    return next({
      log: `userController.createUser. ERROR: ${err}`,
      status: 500,
      message: {
        error:
          'Error occured in userController.createUser. Check logs for more details',
      },
    });
  }
};

userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    // query the database for a user
    const queryText =
      'SELECT user_id, username, password_hash FROM users WHERE username = $1';
      // 'SELECT user_id, username, password_hash FROM users WHERE username = claire'
    console.log('lookout!!: ', queryText)
    const queryParams = [username];
    console.log('userController.verifyUser queryParams:', queryParams)

    const { rows } = await db.query(queryText, queryParams);
    console.log('completed query in userController.verifyUser');

    // TODO fix error handling
    if(rows.length === 0) {
      return res.status(401).json({ error: 'Username not found' });
    }

    const user = rows[0];
    console.log('user!!', user)
    // compare the submitted password with the stored password hash
    const isMatch = await bcrypt.compare(password, user.password_hash);
    console.log(isMatch)
    if (!isMatch) {
      return res.status(401).json({ error: 'Password is incorrect' });
    }

    //storing isMatch
    res.locals.isMatch = isMatch;

    // if password matches, establish a session
    // req.session.userId = user.user_id;
    // console.log('user verified in userController.verifyUser', user.user_id);
    // store username in res.locals to use on homepage
    res.locals.user = user.username;
    res.locals.userData = user;
    // res.locals.userData.user_id

    // go to the next middleware which would be to establish a session
    return next();
  } catch (err) {
    console.error('Error verifying user', err);
    return next({
      log: `userController.verifyUser. ERROR: ${err}`,
      status: 500,
      message: {
        error:
          'Error occured in userController.verifyUser. Check logs for more details',
      },
    });
  }
};

userController.getAllUsers = (req, res, next) => {
  db.query('SELECT * FROM users')
    .then((data) => console.log(data.rows))
    .then(() => next())
    .catch((err) =>
      next({
        log: `userController.getAllUsers. ERROR: ${err}`,
        message: {
          error: 'userController.getAllUsers. Check logs for more details',
        },
      })
    );
};

userController.getUserById = (req, res, next) => {
  const user_id = req.params.id;
  db.query(`SELECT * FROM users WHERE user_id = ${user_id}`)
    .then((data) => data.rows[0])
    .then((data) => {
      console.log(data);
      res.locals.userData = data;
    })
    .then(() => next())
    .catch((err) =>
      next({
        log: 'Express error handler caught userController.getUserById middleware error',
        message: {
          err: 'An error occurred when getting a user, Err: ' + err,
        },
      })
    );
};

module.exports = userController;
