const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    company:{
        type: String,
        required:true,
    },
    title:{
        type: String,
        required:true,
    },
    price:{
        type: Number,
        required:true,
    },
    description:{
        type: String,
        required:true,
    },
    image:{
        type: String,
        required:true,
    },
    cloudinary_id:{
        type: String
    },
    total:{
        type: Number,
        required:true,
    },
    count:{
        type: Number,
        default:1
    },
    sold:{
        type: Number,
        default:0
    },
})

const Product =new mongoose.model('product',productSchema)
module.exports=Product;