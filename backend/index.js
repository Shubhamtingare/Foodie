const express = require("express")
const app = express();
const port = process.env.PORT || 8000
require("./db")
const mongoose = require("mongoose")


app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.use(express.json())
app.get("/",(req,res)=>{
    res.send("hello")
})

app.use("/user",require("./routers/createUser"))
app.use("/user",require("./routers/DisplayData"))
app.use("/user",require("./routers/orderData"))

app.listen(port,(req,res)=>{
    console.log("The server is live at " + port);
})