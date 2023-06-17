import GuideModel from "../models/GuideModel.js";
import UserModel from "../models/UserModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export async function getAdminUsers(req, res) {

    try {

        const name = req.query.name ?? ""
        let users = await UserModel.find({ name: new RegExp(name, 'i'),admin:false}).lean()
        res.json(users)

    } catch (err) {

        return res.json({ err: true, message: "Something went wrong", error: err })

    }
}

export async function getBlockUser(req, res) {
    try{
        const id = req.body.id
        await UserModel.findByIdAndUpdate(id, { $set: { block: true } }).lean()
        res.json({ err: false })
    } catch (err) {
        return res.json({ err: true, message: "Something went wrong", error: err })
    }

}

export async function getunBlockUser(req, res) {
    try{
        const id = req.body.id
        await UserModel.findByIdAndUpdate(id, { $set: { block: false } }).lean()
        res.json({ err: false })
    } catch (err) {
        return res.json({ err: true, message: "Something went wrong", error: err })
    }
}