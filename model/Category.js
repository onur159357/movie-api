const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    category_name : {
        type : String,
        unique : true,
        required : [true, '{PATH} i Girmek Zorundasınız'],
    },
    category_number : {
        type : Number,
        default : 0, 
    },
    category_sub_number : {
        type : Number,
        default : 0,
    },
    category_description : {
        type : String,
    }
});

module.exports = mongoose.model('category', CategorySchema);