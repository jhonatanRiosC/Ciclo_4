const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const proyects = new Schema({
    idproject: { type: String, required: true },
    nameproyect: { type: String, required: true },
    goal: { type: String, required: true },
    specifitgoal: { type: String, required: true },
    butget: { type: Number, required: true },
    dateI: { type: Date, required: true },
    dateF: { type: Date, required: true },
    status: { type: String, required: true },
    fase: { type: String, required: true },
    //Nombrelider:{type:username.get(path.username)},
    //Idlider:{type:username.get(path.identification)}

});

module.exports = mongoose.model('proyect', proyects)
