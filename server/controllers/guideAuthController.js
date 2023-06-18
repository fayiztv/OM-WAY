import GuideModel from '../models/GuideModel.js'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

export async function guideRegister(req,res){
    try{

        const { firstName,lastName, email, about,number } = req.body;
        const guide = await GuideModel.findOne({email})
        if(guide){
            return res.json({err:true,message:"Email already registered"})
        }
        let tempPassword = Math.random().toString(36).substring(2, 10 + 2)
        console.log(tempPassword);

        const newGuide = new GuideModel({firstName,lastName,email,password:tempPassword,contact:number,about})
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

export async function guideLogin(req,res){
    try{

        const {email,password} = req.body
        const guide = await GuideModel.findOne({email}).lean()
        
        if(!guide){
            return res.json({err:true,message:"No guide found"})
        }
        if(guide.block){
            return res.json({err:true,message:"Oops! you are blocked by admin"})
        }

        if(guide.active === false){
            return res.json({ err: true, message: "oops! registration not accepted" })
        }

        if(password != guide.password){
            return res.json({err:true,message:"Wrong password"})
        }
        const token = jwt.sign({
            id:guide._id
        },"myJwtSecretKey")

        return res.cookie("guideToken",token,{
            httpOnly: true,
                    secure: true,
                    maxAge: 1000 * 60 * 60 * 24,
                    sameSite: "none",
        }).json({err:false})

    }catch(err){
        console.log(err)
        return res.json({error:true,message:"somthing went wrong"})
    }
}

export async function checkGuideLoggedIn(req,res){
    try{

        const token = req.cookies.guideToken
        if(!token){
            return res.json({loggedIn:false,error:true,message:"no token"})
        }

        const verifiedJWT = jwt.verify(token,"myJwtSecretKey")
        const guide = await GuideModel.findById(verifiedJWT.id,{password:0})
        if(!guide){
            return res.json({loggedIn:false})
        }
        return res.json({guide,loggedIn:true})

    }catch(err){
        console.log(err);
        return res.json({loggedIn:false,error:err})
      }
}

export async function guideLogout(req,res){
    res.cookie("guideToken", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
    }).json({ message: "logged out", error: false });
    console.log("logged out");
}