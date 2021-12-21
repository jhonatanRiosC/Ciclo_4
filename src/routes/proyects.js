const router = require('express').Router();

 const proyect = require('../models/proyect')

 router.get('/proyects', async (req, res) => {
   const proyects = await proyect.find().lean();
   res.render('../views/proyect/allproyects.hbs',{proyects});
})



router.get('/proyects/formproyect', (req, res) => {
    res.render('formularios/formproyect');
});

router.get('/proyects/edit/:id', async (req,res) =>{
    try {
        const id = req.params.id
        const project = await proyect.findById(id).lean()
        res.render('../views/proyect/editproyect.hbs',{project, id});
    }catch (e){
        console.log(e)
    }
});

router.post('/proyects/edit/:id', async (req, res) => {
    const id = req.params.id;
    await proyect.updateOne({id}, req.body)
    res.redirect('/proyects')
})

router.post('/proyects/delete/:id', async (req, res) => {
    const id = req.params.id;
    await proyect.deleteOne({id})
    res.redirect('/proyects')
})

router.post("/proyects", async (req, res) => {
    const {idproject,nameproyect,goal,specifitgoal,butget,dateI,dateF,status,fase } = req.body;
    const errors = [];
    if (!idproject) {
        errors.push({ text: "Por favor inserte un id del proyecto" })
    }
    if (!nameproyect) {
        errors.push({ text: "Por favor escriba un nombre del proyecto" })
    }
    if (!goal) {
        errors.push({ text: "Por favor escriba un objetivo" })
    }
    if (!specifitgoal) {
        errors.push({ text: "Por favor escriba un objetivo especifico" })
    }
    if (!butget) {
        errors.push({ text: "Por favor inserte un presupuesto" })
    }
    if (!dateI) {
        errors.push({ text: "Por favor ingrese una fecha inicial" })
    }
    if (!dateF) {
        errors.push({ text: "Por favor ingrese una fecha Final si no tiene coloque una lejana proyectada" })
    }
    if (!status) {
        errors.push({ text: "Por favor escriba el estatus del proyecto" })
    }
    if (!fase) {
        errors.push({ text: "Por favor escriba la fase del proyecto" })
    }
    if(errors.length>0){
        res.render('formularios/formproyect',{
            errors,
            idproject,
            nameproyect,
            goal,
            specifitgoal,
            butget,
            dateI,
            dateF,
            status,
            fase
        });

    } else {
       const newproyect = new proyect({idproject,
        nameproyect,
        goal,
        specifitgoal,
        butget,
        dateI,
        dateF,
        status,
        fase});
       await newproyect.save();
       req.flash('success_msg','Proyecto agregado Exitosamente')
       res.redirect('/proyects')
    }
});





module.exports = router;
