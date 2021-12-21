const express = require('express');
const path = require('path');
const { create } = require("express-handlebars");
const methodOverride = require('method-override');
const session =require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

//Inicializaciones
const app = express();
require('./database');
require('./config/passport')

//Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
const hbs = create({
    defaultLayout: 'main',
    LayoutsDirt: path.join(app.get('views'),'layouts'),
    partialsDirt: path.join(app.get('views'),'partials'),
    extname:'hbs'
})
app.engine('hbs', hbs.engine);
app.set('view engine','hbs');




//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'admin',
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());




//Global var
app.use((req,res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user;
    res.locals.leader = req.user ? req.user.tipo === 'Lider' : false;

    next();
});


//Routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/inscription'));
app.use(require('./routes/proyects'));
app.use(require('./routes/requires'));
app.use(require('./routes/students'));

//Static Files
app.use(express.static(path.join(__dirname,'public')))


//Server listenning
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'))

})

