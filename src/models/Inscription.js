const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inscription = new Schema({
    userId: { type: String, required: true},
    description: { type: String, required: true},
    projectId: { type: Number , required: true},
    state: {type: String, default: 'Pendiente'}
});

module.exports = mongoose.model('Inscription', inscription);
