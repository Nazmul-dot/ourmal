const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Product = require('../models/productSchema')
const Payment = require('../models/paymentSchema')

//create payment
router.post('/creatPayment', auth, async(req, res) => {

    const { name, email, phone, vibag, jela, thana, uniyon, alaka, amount } = req.body
    // console.log(req.body)
   
    const cart = req.user.cart;
    const result = new Payment({ name, email, phone, vibag, jela, thana, uniyon, alaka, amount, products: cart, customer_id: req.user._id })
    await result.save()

    cart.filter(item => {
        return sold(item._id, item.count, item.sold)
    })
    req.user.cart=[];
    req.user.address=req.body;
    await req.user.save();
    res.json(result)
    console.log("payment success")
})
const sold = async (id, quantity, oldSold) => {
    await Product.findOneAndUpdate({ _id: id }, {
        sold: quantity + oldSold
    })

}
//get per user payment
router.get('/getUserPayment',auth,async (req, res) => {
    const result=await Payment.find({customer_id:req.user._id})
    res.json(result)
    console.log('get per user payment')
})
// get all user payment
router.get('/getAllUserPayment',auth,async (req, res) => {
    const result=await Payment.find();
    res.json(result)
    console.log('get all user payment')
})

module.exports = router;