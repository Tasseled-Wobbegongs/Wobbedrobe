const mongoose = require('mongoose');
const Session = require('../models/sessionModel');

const sessionController = {};

sessionController.isLoggedIn = async (req, res, next) => {
    // const userId = res.locals.userData.user_id;
    // TODO: fix error handling. invoke next with error OBJECT
    if(!req.cookies.ssid) {
        return res.redirect('/signup');
    }
    
    const sessionId = await Session.find({ cookieId: res.cookies.ssid})

    if(sessionId.length === 0) {
        return res.redirect('/signup');
    }

    return next();
};

sessionController.startSession = async (req, res, next) => {


    if(res.locals.user_id === undefined) {
        return next('ERROR in sessionController.isLoggedIn: No user_id')
    };

    
    // example from notes
    const checkForSession = await Session.findOne({cookieId: res.locals.user_id})
    if(checkForSession) return next();

    coonsole.log('checkForSession!!!', checkForSession)
    Session.create({cookieId: res.locals.user_id}), (err, sessionInfo) => {
        if(err) {
            return next('ERROR in sessionController.isLoggedIn' + err)
        } else {
            return next();
        }
    }
};

module.exports = sessionController;