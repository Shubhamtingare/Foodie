const express = require("express")
const router = express.Router()

const User = require("../models/User")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const secretKey = process.env.SECRET_KEY

router.post("/register",async(req,res)=>{
    try {
        const salt = await bcrypt.genSalt(10)
        const secPassword =await bcrypt.hash(req.body.password,salt)
        await User.create({
            name:req.body.name,
            location:req.body.location,
            email:req.body.email,
            password:secPassword
        })
        res.json({success:true})
    } catch (error) {
        console.log(error);
        res.json({success:false})
    }
})
router.post("/login",async(req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        const userData = await User.findOne({email:email})

        if(!userData){
            return res.status(400).json({errors:"Try logging with correct credentials"})
        }
        const isPasswordValid = await bcrypt.compare(password, userData.password);

        if(!isPasswordValid){
            return res.status(400).json({errors:"Try logging with correct credentials"})
        }
        const authToken = jwt.sign({id:userData._id},secretKey)

        return res.json({success:true , authToken:authToken})
    } catch (error) {
        console.log(error);
        res.json({success:false})
    }
})

module.exports = router