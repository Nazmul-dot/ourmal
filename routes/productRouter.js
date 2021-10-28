const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
const Product = require('../models/productSchema')

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: 'nazmul-haq',
  api_key: '766645492229863',
  api_secret: 'Ovx-5LezkfDqt05b31tgLpA_nS0'
});

//get product
router.get('/getproduct', async (req, res) => {
  const result = await Product.find();
  console.log("getALLproduct")
  res.json(result)
})
//creat product
router.post("/creatProduct", auth, async (req, res) => {
  // console.log(req.files)
  // console.log(req.body)
  try {
    // Upload image to cloudinary
    //'image' holo giye input er name='' a ja likha hoi ta
    //input type='files' name="image"
    // console.log(req.files.image.tempFilePath)

    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath);
    // console.log(result.secure_url)
    const { title, price, company, description } = req.body;
    const producDoc = new Product({ title, price, company, description, total: price, image: result.secure_url, cloudinary_id: result.public_id })
    await producDoc.save()
    console.log(producDoc)
    res.json(producDoc)

  } catch (err) {
    console.log(err);
  }

});

//delet product
router.delete('/delet/:id', async (req, res) => {
  const _id = req.params.id
  const product = await Product.findByIdAndDelete({ _id })
  console.log('delet product')
  res.json(product)
})

//update product
router.patch('/update/:id', auth, async (req, res) => {
  // console.log(req.body)
  // console.log(req.files)
  const _id = req.params.id

  if (!req.files) {
    var product = await Product.findByIdAndUpdate(_id, req.body, { new: true })
    console.log('req.files null')
  }


  if (req.files) {
    const { title, company, price, description } = req.body
    // await cloudinary.uploader.destroy(product.cloudinary_id);
    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath);
    product = await Product.findByIdAndUpdate(_id,
      { title, company, price, total: price, description, image: result.secure_url, cloudinary_id: result.public_id },
      { new: true })
    console.log('req.files not null')
  }
  console.log('update product')
  console.log(product)
  res.json(product)
})

module.exports = router;