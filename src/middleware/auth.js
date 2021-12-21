const User = require('../models/User');

const middlewares = {};

middlewares.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        console.log(req.session.passport.user)
        return next();
    }else{
        req.flash('error_msg', 'Usuario no autorizado');
        res.redirect('/users/signin')
    }
}

middlewares.isLeader = async (req, res, next) => {
    const _id = req.session.passport.user;
    const {tipo} = await User.findOne({_id}, 'tipo').exec();
    console.log(tipo)
    if(tipo === 'Lider'){
        return next();
    } else {
        res.redirect('/')
    }
}
module.exports = middlewares;
