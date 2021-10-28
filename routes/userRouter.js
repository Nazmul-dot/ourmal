const express = require('express')
const router = express.Router()
const User = require('../models/userSchema')
const Product=require('../models/productSchema')
const auth = require('../middleware/auth')
const bcrypt = require('bcryptjs')
// const Product = require('../models/porductSchema')
router.get('/', (req, res) => {
    res.send('hlw')
})

//register
router.post('/register', async (req, res) => {
    console.log(req.body)
    // res.json({massage:req.body})
    const { name, user_name, email, password, cpassword } = req.body;
    if (!name || !user_name || !email || !password || !cpassword) {
        return res.status(422).json({ error: "plz fill all fild" })
    }
    try {
        const data = await User.findOne({ email: email })
        if (data) {
            console.log('vhul,email already ache')
            return res.status(422).json({ error: "email already exist.." })
        }
        else if (password !== cpassword) {
            console.log('vhul')
            return res.status(422).json({ error: "both password are not same" })
        }
        else {
            const docu = new User({ name, user_name, email, password, cpassword })
            const token = await docu.genationToken();
            // console.log(token)
            res.cookie('jwtToken', token)
            await docu.save();
            console.log('register')
            // console.log(docu)
            res.status(201).json(docu)
        }
    } catch (error) {
        console.log(error)
    }
})
//login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            console.log('vhul pass khali')
            return res.status(400).json({ error: "fill all field" })
        }
        const userSignin = await User.findOne({ email: email });
        //console.log(userSignin)
        if (userSignin) {
            //res.json({ message: "user signin successfully" })
            const ismatch = await bcrypt.compare(password, userSignin.password)
            if (ismatch) {
                const token = await userSignin.genationToken();
                console.log(token)
                res.cookie('jwtToken', token)
                // console.log(res.cookie.jwtToken)
                //    const cartVal={
                //        title:'hwl',
                //        price:'20'
                //    };
                //    const cartVal2=[
                //        {
                //         title:'hwl',
                //         price:'50'
                //        },
                //        {
                //         title:'hwl3',
                //         price:'43'
                //        },
                //        {
                //         title:'hwl4',
                //         price:'70'
                //        },
                //    ]


                //    userSignin.cart=cartVal2;
                // // userSignin.cart=[...userSignin.cart,cartVal1];
                //    await userSignin.save();
                //     console.log(userSignin.name)
                console.log("user signin successfully")
                res.json(userSignin)
            }
            else {
                console.log('vhul pass')
                return res.status(400).json({ error: "user error" })
            }
        }
        else {
            console.log('vhul')
            return res.status(400).json({ error: "user error" })
        }
    } catch (error) {
        console.log(error)
    }
})
//get cart 
router.get('/getcart', auth, async (req, res) => {
    console.log("getcart a duhkce")
   
    const cart= req.user.cart;
    console.log("getALLcart")
    res.json(cart)
})
//set cart
router.post('/setcart', auth, async (req, res) => {
    console.log(req.body)
   req.user.cart=req.body
   const result= await req.user.save()
   res.json(result)
   console.log("setcart hoiyeche")
})
//clear cart
router.get('/clearCart',auth,async(req,res)=>{
    req.user.cart=[]
    const result=  await req.user.save()
    res.json(result)
    console.log('clearCart')
})
//logout
router.get('/logout', auth, async (req, res) => {

    // req.user.tokens = []
    const result = await req.user.save()
    res.clearCookie('jwtToken')
    console.log("logout")
    res.send(result)
})
//userloged
router.get('/userlogged', auth, async (req, res) => {
    console.log("userlogged")
    res.send(req.user)
})
module.exports = router