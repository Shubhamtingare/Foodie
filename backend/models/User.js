const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = mongoose.Schema({
    
        name: {
            type:String,
            required:true
        },
        location: {
            type:String,
            required:true
        },
        email: {
            type:String,
            required:true,
            unique:true,
            validate(val){
                const res = validator.isEmail(val)
                if(!res){
                    throw new Error("Invalid email")
                }
            }
        },
        password: {
            type:String,
            required:true,
            minLength:8,
    },
        date:{
            type:Date,
            default:Date.now
        }
      
})

const User = new mongoose.model("User",userSchema)

module.exports = User