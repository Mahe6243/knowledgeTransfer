const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        maxlength:50,
        required:true,
        trim:true
    },
    description:{
        type:String,
        maxlength:2000,
        trim:true,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    images:[{
        ContentType:String,
        data:Buffer
    }]
},{timestamps:true});

module.exports = mongoose.model("Product",productSchema);
