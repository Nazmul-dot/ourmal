//require part
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
require("./db/conn");

app.use(cookieParser());
app.use(express.json());

app.use(cors());

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use(require("./routes/userRouter"));
app.use(require("./routes/productRouter"));
app.use(require("./routes/paymentRouter"));

app.get("/", (req, res) => {
  res.send("test is done initially");
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`port running on ${port}`);
});
