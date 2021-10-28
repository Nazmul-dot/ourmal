const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
//collection er structior
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    cpassword: {
        type: String,
        required: true,
    },
    cart: {
        type: Array,
        default: []
    },
    address: {
        type: Object,
        default: {}
    },
    // tokens:[{
    //     token:{
    //         type:String,
    //         required:true
    //     }
    // }]
    tokens: {
        type: String,
        default:'',
        required: true
    }
})

// token genarate....
userSchema.methods.genationToken = async function () {
    try {
        console.log(process.env.KEY)
        //.env file theke newa variable
        const tokengen = jwt.sign({ _id: this._id.toString() }, process.env.KEY)
        // this.tokens=this.tokens.concat({token:tokengen});
        this.tokens = tokengen;
        await this.save();
        return tokengen;
    } catch (error) {
        console.log("error part........")

    }
}
//hasing password.....
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();

})

// collection toiri
const User = new mongoose.model("user", userSchema)
module.exports = User;