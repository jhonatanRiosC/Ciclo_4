const router = require('express').Router();
const Proyect = require('../models/proyect');

router.get('/inscription',async (req,res) =>{
    const projects = await Proyect.find().lean()
    console.log(projects)
    res.render('inscription/form', {projects});
})

router.post('/inscription', (req, res) => {
    console.log(req.body)
})

module.exports = router;


module.exports = router;
