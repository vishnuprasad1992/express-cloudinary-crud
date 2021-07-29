const express = require("express");
const  router = express.Router();
const upload = require("../helper/multerHelper");
const User = require("../model/userModel");
const cloudinary = require("../helper/cloudinaryHelper");


router.post("/",upload.single("image"), async (req,res) =>{
    
    try {
        const result = await cloudinary.uploader.upload(req.file.path)
     
        const user = new User({
            name:req.body.name,
            image:result.secure_url,
            cloudinary_id : result.public_id
        })
    
        await user.save()
        .then(response => res.json(response))
        .catch(err => console.log(err));
    } catch (error) {
        console.log(console.error());
    }
    
});


router.get("/:id", async (req,res) =>{
    try {
        const {id} = req.params
        await User.findById({_id:id})
        .then(response => res.json(response))
        .catch(err => console.log(err));
    } catch (error) {
        console.log(console.error());
    }
});

router.delete("/:id", async (req,res) =>{
    try {
        const {id} = req.params
        const user= await User.findById({_id:id})
        await cloudinary.uploader.destroy(user.cloudinary_id);
        await User.findByIdAndDelete({_id:id})
        .then(response => res.json({status:"success",message : "deleted successfully"}))
        .catch(err => console.log(err));
    } catch (error) {
        console.log(console.error());
    }
});

router.put("/:id",upload.single("image"),async (req,res) =>{
    try {
        const {id} = req.params
        const user= await User.findById({_id:id})
        await cloudinary.uploader.destroy(user.cloudinary_id);
        const result = await cloudinary.uploader.upload(req.file.path)
        const userUpdate = {
            name:req.body.name,
            image:result.secure_url,
            cloudinary_id : result.public_id
        }
        await User.findByIdAndUpdate({_id:id},userUpdate)
        .then(() => res.json({status:"success",message : "updated successfully"}))
        .catch(err => console.log(err));
    } catch (error) {
        console.log(console.error());
    }
});




module.exports = router