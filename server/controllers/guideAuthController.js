import GuideModel from '../models/GuideModel.js'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import sentPass from '../helpers/sentPassword.js'

var salt = bcrypt.genSaltSync(10);

export async function guideRegister(req,res){
    try{

        const { firstName,lastName, email, about,number } = req.body;
        const guide = await GuideModel.findOne({email})
        if(guide){
            return res.json({err:true,message:"Email already registered"})
        }
        let tempPassword = Math.random().toString(36).substring(2, 10 + 2)
        console.log(tempPassword);
        let passSent = await sentPass(email,tempPassword)

        const hashPassword = bcrypt.hashSync(tempPassword, salt);

        const newGuide = new GuideModel({firstName,lastName,email,password:hashPassword,contact:number,about})
        await newGuide.save()

        const token = jwt.sign(
            {
                id: newGuide._id
            },'myJwtSecretKey'
        )
        return res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
        }).json({ err: false })

    }catch (err) {
        console.log(err)
        res.json({ error: err, err: true, message: "something went wrong" })
    }
}