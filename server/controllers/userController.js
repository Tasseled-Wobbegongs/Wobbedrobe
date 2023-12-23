const db = require('../models/db.js');
const bcrypt = require('bcrypt');
const express = require('express'); // // put this in server to be able to use in all server files
const session = require('express-session'); // put this in server to be able to use in all server files

// userController would be called from server once it receives a post request then session middleware would be called to set a new session

const userController = {};

userController.createUser = async(req, res, next) => {
    const { username, password } = req.body;
    console.log('this is req.body in createUser', req.body);
    try {
        // hash the password
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);

        // insert the new user into the database and return user_id and username
        const queryText = 'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING user_id, username;';
        const queryParams = [username, hashedPassword];
        const { rows } = await db.query(queryText, queryParams);
        console.log('completed query in userController.createUser');

        // store user_id in session
        // req.session object is used to store data that you want to keep across requests made by the same user
        req.session.userId = rows[0].user_id;
        console.log('this is req.session.userId in userController.createUser', req.session.userId);
        // store username in res locals
        res.locals.user = rows[0].username;
        // go to next middleware which would be to create session with userId
        return next();
    } catch(err) {
        return next({
            log: `userController.createUser. ERROR: ${err}`,
            status: 500,
            message: { error: 'Error occured in userController.createUser. Check logs for more details' }
        });
    }
};

userController.verifyUser = async(req, res, next) => {
    const { username, password } = req.body;
    try {
        // query the database for a user 
        const queryText = 'SELECT user_id, username, password_hash FROM users WHERE username = $1';
        const queryParams = [username];
        const { rows } = await db.query(queryText, queryParams);
        console.log('completed query in userController.verifyUser');

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Username not found' });
        }

        const user = rows[0];
        // compare the submitted password with the stored password hash
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({ error: 'Password is incorrect' });
        }

        // if password matches, establish a session
        req.session.userId = user.user_id;
        console.log('user verified in userController.verifyUser', user.user_id);
        // store username in res.locals to use on homepage
        res.locals.user = user.username;
        // go to the next middleware which would be to establish a session
        return next();
    } catch(err) {
        console.error('Error verifying user', err);
        return next({
            log: `userController.verifyUser. ERROR: ${err}`,
            status: 500,
            message: { error: 'Error occured in userController.verifyUser. Check logs for more details' }
        });
    }
};