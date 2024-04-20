const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/gofood")
.then(()=>{
    console.log("Database connected successfully");
    const getDoc = async()=>{
        try {
            const fetched_data =  mongoose.connection.db.collection("food_items")
            const foodItem =  await fetched_data.find({}).toArray()

            const category_data = mongoose.connection.db.collection("foodCategory")
            const foodCat =  await category_data.find({}).toArray()
            
            global.food_items = foodItem
            global.foodCategory = foodCat
            // console.log(global.food_items);
        } catch (error) {
            console.log(error);
        }
    }
    getDoc();
   
}).catch((err)=>{
    console.log("database connection error"+ err);
})