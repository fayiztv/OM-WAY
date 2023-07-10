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
import guideRouter from './routers/guideRouter.js'
import verifyAdmin from './middlewares/verifyAdmin.js';
import verifyUser from './middlewares/verifyUser.js';
import verifyGuide from './middlewares/verifyGuide.js';

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
app.use("/admin",verifyAdmin,adminRouter)
app.use('/user/auth/',userAuthRouter)
app.use('/user',verifyUser,userRouter)
app.use('/guide/auth/',guideAuthRouter)
app.use('/guide',verifyGuide,guideRouter)
 


app.listen(2004,()=>{
    console.log("server running on port 2004");
})