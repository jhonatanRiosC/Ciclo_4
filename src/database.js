const mongoose = require('mongoose')

const mongodb_uri = process.env.MONGO_URI;
// const mongodb_uri = process.env.MONGO_URI | 'mongodb://localhost/enigma-app';

mongoose.connect(mongodb_uri, {

})
    .then(() => console.log('Db is connected'))
    .catch((e) => console.error(e));


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;











