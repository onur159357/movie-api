const mongoose = require('mongoose'),
        Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director : {
        type: Schema.Types.ObjectId,
        required : [true, '{PATH} i Girmek Zorundasınız']
    },
    category : {
        type: Schema.Types.ObjectId,
        required : [true, '{PATH} i Girmek Zorundasınız']
    },
    movie_name : {
        type : String,
        unique : true,
        required : [true, '{PATH} i Girmek Zorundasınız'],
    },
    movie_video : {
        type : String,
    },
    movie_country : {
        type : String,
    },
    movie_year : {
        type : Date,
        default :Date.now,
    },
    imdb_score : {
        type : Number,
    },
    movie_img : { 
        type : String,
        required : [true, '{PATH} i Girmek Zorundasınız'],
    },
});

module.exports = mongoose.model('movies', MovieSchema);