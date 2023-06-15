import UserModel from '../models/UserModel.js'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import sentOtp from '../helpers/sentOtp.js'

var salt = bcrypt.genSaltSync(10);

export async function userRegister(req,res){
    try{

        const { email } = req.body;
        const user = await UserModel.findOne({email})
        if(user){
            return res.json({err:true,message:"User Already Exist"})
        }
        let otp = Math.ceil(Math.random()*10000)
        console.log(otp)
        let otpSent = await sentOtp(email,otp)
        const token = jwt.sign({
            otp:otp
        },'myJwtSecretKey')

        return res.cookie("tempToken", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60,
            sameSite: "none",
        }).json({ err: false })

    }catch(err){
        console.log(err);
        res.json({ err: true, error: err, message: "something went wrong" })

    }
}

export async function userRegisterVerify(req,res){
    try{

        const { name, email, password,number, otp } = req.body;
        const tempToken = req.cookies.tempToken;

        if (!tempToken) {
            return res.json({ err: true, message: "OTP Session Timed Out" });
        }

        const verifiedTempToken = jwt.verify(tempToken,'myJwtSecretKey')

        if (otp != verifiedTempToken.otp) {
            return res.json({ err: true, message: "Invalid OTP" });
        }
        
        const hashPassword = bcrypt.hashSync(password, salt);  

        const newUser = new UserModel({ name, email, password: hashPassword,contact:number })
        await newUser.save();

        const token = jwt.sign(
            {
                id: newUser._id
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

export async function userLogin(req,res){
    try{

        const {email,password} = req.body
        const user = await UserModel.findOne({email}).lean()
        if(!user){
            return res.json({err:true,message:"No user found"})
        }
        if(user.admin){
            return res.json({ err: true, message: "no user found" })
        }

        const valideUser = bcrypt.compareSync(password,user.password)
        if(!valideUser){
            return res.json({err:true,message:"Wrong password"})
        }
        const token = jwt.sign({
            id:user._id
        },"myJwtSecretKey")

        return res.cookie("userToken",token,{
            httpOnly: true,
                    secure: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    sameSite: "none",
        }).json({err:false})

    }catch(err){
        console.log(err)
        return res.json({error:true,message:"somthing went wrong"})
    }
}