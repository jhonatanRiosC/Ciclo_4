const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inscription = new Schema({
    userId: "number",
    description: "text",
    projectId: "number"
});

module.exports = mongoose.model('Inscription', inscription);
