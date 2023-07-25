import MessageModel from "../models/MessageModel.js";

export async function addMessage(req,res){

    const {chatId,senderId,text} = req.body
    const message = new MessageModel({
        chatId,
        senderId,
        text
    })

    try {
        const result = await message.save()
        res.json({ err: false, result });

    } catch (error) {
        console.log(error);
        return res.json({ err: true, message: "Something went wrong", error: err })
    }
}

export async function getMessage(req,res){
    const {chatId} = req.params
    try {
        const result = await MessageModel.find({chatId})
        res.json({ err: false, result });      
        
    } catch (error) {
        console.log(error);
        return res.json({ err: true, message: "Something went wrong", error: err })
    }
}
