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

export async function checkAdminLoggedIn(req, res) {
    try {
        const token = req.cookies.adminToken;
        if (!token) {
            return res.json({ loggedIn: false, error: true, message: "No Token" })
        }
        const verifiedJWT = jwt.verify(token, "myJwtSecretKey")
        const admin = await UserModel.findById(verifiedJWT.id,{admin:true}, { password: 0 })
        if (!admin) {
            return res.json({ loggedIn: false })
        }
        return res.json({ admin, loggedIn: true })

    } catch (err) {

        res.json({ loggedIn: false, error: err })
        console.log(err)

    }
}

export async function adminLogout(req, res) {
    res.cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
    }).json({ message: "logged out", error: false });
    console.log("logged out");
}