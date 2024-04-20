const mongoose = require("mongoose")
const validator = require("validator")

const orderSchema = mongoose.Schema({
    
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
        order_data: {
            type:Array,
            required:true,
    },
        date:{
            type:Date,
            default:Date.now
        }
      
})

const Order = new mongoose.model("Order",orderSchema)

module.exports = Order