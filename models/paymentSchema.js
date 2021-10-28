const mongoose=require('mongoose');

const paymentSchema=new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    phone:{
        type: Number,
        required:true,
    },
    email:{
        type: String,
        required:true,
    },
    vibag:{
        type: String,
        required:true,
    },
    jela:{
        type: String,
        required:true,
    },
    thana:{
        type: String,
    },
    uniyon:{
        type: String,
    },
    alaka:{
        type: String,
    },
    amount:{
        type: Number,
        required:true,
    },
    products:{
        type:Array,
        default:[],
    },
    customer_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    }
})

const Payment =new mongoose.model('payment',paymentSchema)
module.exports=Payment;