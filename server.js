import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors'
import { connectDB } from './config/db.js';

//--------------------- all routes ---------------------------------
import  userRoutes  from './routes/userRoutes.js';
import productRoute from './routes/productRoutes.js';
import reviewRoute from './routes/reviewRoutes.js';
import orderRoute from './routes/orderRoutes.js';
import paymentRoute from './routes/paymentRoutes.js';
import orderitemRoute from './routes/orderitemRoutes.js';
// import loginrouter from "./routes/loginRoutes.js";


//--------------------- end here ----------------------------------

dotenv.config()
const app = express();
// for connection 
app.use(cors())
// for json data
app.use(express.json())
// body parser  for taking data from document or body 
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


//--------------------- all routes ---------------------------------

app.use("/",userRoutes)
app.use("/",productRoute)
app.use("/", reviewRoute);
app.use("/", orderRoute);
app.use("/", paymentRoute);
app.use("/", orderitemRoute);

// app.use("/", loginrouter)

//--------------------- end here ----------------------------------



connectDB()
const  port=process.env.PORT || 5000
app.listen(port,()=>{
    console.log("server Created")
})



