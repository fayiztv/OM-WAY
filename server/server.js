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
import chatRouter from './routers/chatRouter.js'
import MessageRouter from './routers/messageRouter.js'
import verifyAdmin from './middlewares/verifyAdmin.js';
import verifyUser from './middlewares/verifyUser.js';
import verifyGuide from './middlewares/verifyGuide.js';
import 'dotenv/config'
import { Server } from 'socket.io';
import http from "http"


const app=express();

app.use(express.json({limit: '50mb'}))
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.resolve()+"/public"))




/////////////// socket io ////////////////////

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:4000", 
    "https://omway.netlify.app"
  ]
  },
});

let acitveUsers = []

io.on("connection",(socket)=>{
  
  //add new user
  socket.on("new-user-add", (newUserId) => {
    // if user is not added previously
    if (!acitveUsers.some((user) => user.userId === newUserId)) {
      acitveUsers.push({ userId: newUserId, socketId: socket.id });
    }
    // send all active users to new user
    io.emit("get-users", acitveUsers);
  });

  socket.on("disconnect", () => {
    // remove user from active users
    acitveUsers = acitveUsers.filter((user) => user.socketId !== socket.id);
    // send all active users to all users
    io.emit("get-users", acitveUsers);
  });

  // send message to a specific user
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = acitveUsers.find((user) => user.userId === receiverId);
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
    }
  });
})



////////////////////////////////////////////////

app.use(
  cors({
    origin: [ 
      "http://localhost:4000",
      "https://omway.netlify.app"
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
app.use('/chat',chatRouter)
app.use('/message',MessageRouter)


 


server.listen(2004,()=>{
    console.log("server running on port 2004");
})