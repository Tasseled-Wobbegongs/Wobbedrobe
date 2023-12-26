
const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {
    const { user_id, username } = req.body; 

    Session.findOne( { user_id, username } )
        .then(data => {
            if(data) {
                return next(res.redirect('/'));
            }  else {
                return next(res.redirect('/user/signup'))
            } 
        })
        .catch((err) => {
            return next('Error in sessionController.isLoggedIn ' + JSON.stringify(err));
        })
};

sessionController.startSession = (req, res, next) => {
    const newSession = new Session({ cookieId: res.locals.userData })

    newSession.save()
        .then((savedSession) => {
       console.log(savedSession)
       return next();   
}   )
    .catch((err) => next('Error in sessionController.startSession: ' + JSON.stringify(err)))
};

module.exports = sessionController;
