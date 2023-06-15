import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import UserModel from "../models/UserModel.js";


var salt = bcrypt.genSaltSync(10)

export async function adminLogin(req,res){
    try{

        const {email,password} = req.body
        const admin = await UserModel.findOne({email,admin:true})
        if(!admin){
            return res.json({err:true,message:"You have no admin access"})
        }

        const adminValid = bcrypt.compareSync(password,admin.password)
        if(!adminValid){
            return res.json({err:true,message:"Wrong password"})
        }
        const token = jwt.sign({
            admin: true,
            id: admin._id
        }, "myJwtSecretKey"
        )
        return res.cookie("adminToken", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
        }).json({ error: false })

    }catch(err){
        res.json({message:"server error",error:err})
        console.log(err);
    }
}