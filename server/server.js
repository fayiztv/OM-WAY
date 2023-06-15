import path from 'path'
import dbConnect from "./config/dbConnect.js"
import express  from "express"
import cookieParser from 'cookie-parser';
import cors from 'cors'
import userAuthRouter from './routers/userAuthRouter.js'
// import adminAuthRouter from './routers/adminAuthRouter.js'

const app=express();

app.use(express.json({limit: '50mb'}))
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.resolve()+"/public"))
app.use(
  cors({
    origin: [ 
      "http://localhost:4000"
    ],
    credentials: true,
  })
);
dbConnect();

// app.use('/user/auth/',userAuthRouter)
// app.use('/admin/auth/',adminAuthRouter)
 


app.listen(2000,()=>{
    console.log("server running on port 2000");
})