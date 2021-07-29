const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    cloudinary_id:{
        type:String,
        required:true
    }
},{timestamps:true})

const cloudUser = mongoose.model("cloud-users", userSchema);


module.exports = cloudUser