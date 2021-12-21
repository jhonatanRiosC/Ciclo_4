const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const users = new Schema({
    username: { type: String, required: true},
    password: { type: String, required: true },
    email: { type: String, required: true },
    tipo: { type: String, required: true },
    identification: { type: String, required: true },
    dateC: { type: Date, default: Date.now }

})

users.methods.encryptPassword =  async (password) => {
     const salt = await bcrypt.genSalt(10);
     const hash = bcrypt.hash(password, salt);
     return hash;
}

users.methods.matchPassword = async  function (password){
    return  await bcrypt.compare(password , this.password);

};

module.exports = mongoose.model('User', users)