//require part
require('dotenv').config();
const express=require("express");
const app=express();
// const cors =require('cors')
const cookieParser = require("cookie-parser")
const fileUpload = require('express-fileupload')
require('./db/conn')

app.use(cookieParser())
// for json data
app.use(express.json())
//

// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));

// app.use(cors())
// app.use(cors({
//     origin:"['http://localhost:3000']",
//     credentials:true,
// }));

app.use(fileUpload({
    useTempFiles: true
}))

app.use(require('./routes/userRouter'))
app.use(require('./routes/productRouter'))
app.use(require('./routes/paymentRouter'))

const port=process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`port running on ${port}`)
})