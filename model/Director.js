const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const directorSchema = new Schema({
    director_name : {
        type : String,
        required : [true, '{PATH} i girmek zorundasınız'],
    },
    director_surname : {
        type : String,
        required : [true, '${PATH} i girmek zorundasınız'],
    },
    director_biography : {
        type : String,
    },
    director_age : {
        type : Date,
    },
    director_rate : {
        type : Number,
    }
});

module.exports = mongoose.model('director', directorSchema);