require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./Database/db')
const foodRouter = require('./routes/food.routes')
const userRouter = require('./routes/user.routes')
const cartRouter = require('./routes/cart.routes')
const orderRouter = require('./routes/order.routes')
// app config
const app = express()
const port = 4000

// middleware
app.use(express.json())
app.use(cors())

// DB connection
connectDB();
//api endpoints
app.use("/api/food",foodRouter)
app.use('/image',express.static('uploads'))
app.use("/api/user",userRouter)
app.use('/api/cart',cartRouter)
app.use("/api/order",orderRouter)


app.get("/",(req,res)=>{
    res.send("Api is working")
})
app.listen(port,()=>{
    console.log("server is running on port 4000")
})