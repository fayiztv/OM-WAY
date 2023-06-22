import path from 'path'
import dbConnect from "./config/dbConnect.js"
import express  from "express"
import cookieParser from 'cookie-parser';
import cors from 'cors'
import userAuthRouter from './routers/userAuthRouter.js'
import adminAuthRouter from './routers/adminAuthRouter.js'
import adminRouter from './routers/adminRouter.js'
import userRouter from './routers/userRouter.js'
import guideAuthRouter from './routers/guideAuthRouter.js'

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

app.use('/admin/auth/',adminAuthRouter)
app.use('/admin',adminRouter)
app.use('/user/auth/',userAuthRouter)
app.use('/user/',userRouter)
app.use('/guide/auth/',guideAuthRouter)
 


app.listen(2005,()=>{
    console.log("server running on port 2005");
})