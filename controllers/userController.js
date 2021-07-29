const user = require("../model/userModel");
const cloudinary = require("../helper/cloudinaryHelper");


const addUser = async (req,res) =>{

    const result = await cloudinary.uploader.upload(req.file.path)



    console.log(result)
}


module.exports={
    addUser
}