import ChatModel from "../models/ChatModel.js";


export async function createChat(req, res) {

    const {guideId,userId} = req.body

    const newChat = new ChatModel({
        members:[req.body.userId,req.body.guideId]
    })

    try {

        const existingChat = await ChatModel.findOne({
            members: { $all: [userId, guideId] },
          });
      
          if (existingChat) {
            return res.json({ err: false});
          }

        const result = await newChat.save()
        res.json({ err: false, result });
        
    } catch (err) {
        console.log(err);
        return res.json({ err: true, message: "Something went wrong", error: err })
    }

}

export async function userChats(req,res){
    try {

        const chat = await ChatModel.find({
            members: {$in:[req.params.userId]}
        })
        res.status(200).json(chat)
        
    } catch (error) {
        console.log(error);
        return res.json({ err: true, message: "Something went wrong", error: err })
    }
}

export async function findChat(req,res){
    try {

        const chat = await ChatModel.find({
            members: {$all:[req.params.firstId,req.params.secondId]}
        })
        res.status(200).json(chat)

    } catch (error) {
        console.log(error);
        return res.json({ err: true, message: "Something went wrong", error: err })
    }
}