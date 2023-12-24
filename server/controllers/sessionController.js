
const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {
    const { cookieId, createdAt } = req.body; 

    Session.find( {cookieId, createdAt} )
        .then(data => {
            if(data.cookieId && data.createdAt) {
                return next(res.redirect('/user/login'));
            }  else {
                return next(res.redirect('/user/signup'))
            } 
        })
        .catch((err) => {
            return next('Error in sessionController.isLoggedIn ' + JSON.stringify(err));
        })
};

sessionController.startSession = (req, res, next) => {
    const newSession = new Session({ cookieId: res.locals.id })

    newSession.save()
        .then((savedSession) => console.log(savedSession))
        .catch((err) => next('Error in sessionController.startSession: ' + JSON.stringify(err)))
    return next();
};

module.exports = sessionController;
