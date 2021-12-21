const User = require('../models/User');

const middlewares = {};

middlewares.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash('error_msg', 'Usuario no autorizado');
        res.redirect('/users/signin')
    }
}

middlewares.isLeader = async (req, res, next) => {
    const { tipo } = req.user;
    if(tipo === 'Lider'){
        return next();
    } else {
        res.redirect('/')
    }
}
module.exports = middlewares;
