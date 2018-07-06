const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    category_name : {
        type : String,
        unique : true,
        required : [true, '{PATH} i Girmek Zorundasınız'],
    },
    // test_code : {
    //     type : Number,
    //     unique : true,
    // },
    category_id : {
        type : Number,
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