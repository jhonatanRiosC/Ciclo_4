const router = require('express').Router();
const Proyect = require('../models/proyect');
const User = require('../models/User');
const Inscription = require('../models/Inscription');
const {isAuthenticated, isLeader} = require('../middleware/auth')

router.get('/inscription', isAuthenticated, async (req,res) =>{
    const projects = await Proyect.find().lean()
    res.render('inscription/form', {projects});
})

router.post('/inscription',isAuthenticated, async (req, res) => {
    const _id = req.session.passport.user;
    const {project, description} = req.body;
    const inscription = new Inscription({
        description,
        projectId: project,
        userId: _id
    });
    await inscription.save();
    res.redirect('/proyects')
})

router.post('/inscription/approve/:id', async (req, res) => {
    const _id = req.params.id;
    await Inscription.findByIdAndUpdate(_id, {state: 'Aprobado'}).exec();
    res.redirect('/inscriptions')
})
router.post('/inscription/delete/:id', async (req, res) =>{
    const _id = req.params.id;
    await Inscription.deleteOne({_id}).exec();
    res.redirect('/inscriptions')
})

router.get('/inscriptions',isAuthenticated, isLeader, async (req,res) =>{
    const dataRender = [];
    for await (const doc of Inscription.find()){
        const  {userId, description, state, projectId, _id } = doc;
        const {username} = await User.findOne({_id: userId}).exec()
        const {nameproyect: projectName} = await Proyect.findOne({ idproyect: projectId}).exec();
        dataRender.push({
            projectId,
            projectName,
            description,
            username,
            state,
            _id
        })
        console.log(dataRender)
    }
    res.render('inscription/list', {dataRender});
})

module.exports = router;


module.exports = router;
