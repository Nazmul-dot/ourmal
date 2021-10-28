const mongoose = require("mongoose");
const uri =
  "mongodb+srv://ourmol:4vQW1Zgjo6tasO1P@cluster0.iohnz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("mongodb connection successfull....."))
  .catch((err) => console.log(err));
