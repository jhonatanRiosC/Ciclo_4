const router = require('express').Router();
const User = require('../models/User');
const passport = require('passport')

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
})

router.post('/users/signin', passport.authenticate('local',{
    successRedirect: '/proyects',
    failureRedirect: '/users/signin',
    failureFlash: true

}))

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
})

router.post('/users/signup', async (req, res) => {
    const { username, password, confirm_password, email, tipo, identification } = req.body
    const errors = [];
    if (!username || username.length <= 0) {
        errors.push({ text: 'Por favor ingrese el nombre' })
    }
    if (password != confirm_password) {
        errors.push({ text: ' Las Contraseñas no coinciden' })
    }
    if (password.length < 4) {
        errors.push({ text: 'La contraseña debe tener mas de 4 caracteres' })
    }
    if (errors.length > 0) {
        res.render('users/signup', { errors, username, password, confirm_password, email, tipo, identification });
    } else {
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            errors.push({text: 'El correo ya esta registrado'})
            res.render('users/signup', { errors, username, password, confirm_password, email, tipo, identification });

        } else {
            const newUser = new User({ username, password, email, tipo, identification })
            newUser.password = await newUser.encryptPassword(password);
            try {
                await newUser.save();
                req.flash('success_msg', 'Usuario Creado Exitosamente');
                res.redirect('/users/signin')

            } catch (e) { console.log(e) }

        }



    }

})

router.get('/users/logout',(req,res) => {
    req.logout();
    req.flash("success_msg","Finalizaste sesion");
    res.redirect("/users/signin")
})

module.exports = router;
