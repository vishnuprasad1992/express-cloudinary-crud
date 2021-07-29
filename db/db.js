const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();


const dbConnect = async ()=>{
    await mongoose.connect(process.env.MONGO_URL,{
        useCreateIndex:true,
        useFindAndModify:false,
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=> console.log("mondodb connected successfully"))
    .catch(err=> console.log(err))
}

module.exports = dbConnect;
