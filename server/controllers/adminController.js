import GuideModel from "../models/GuideModel.js";
import UserModel from "../models/UserModel.js";
import sentPass from '../helpers/sentPassword.js'

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

export async function getAdminGuides(req, res) {

    try {
        const name = req.query.name ?? ""
        let guides = await GuideModel.find({ firstName: new RegExp(name, 'i'),active:true}).lean()
        res.json(guides)

    } catch (err) {
        return res.json({ err: true, message: "Something went wrong", error: err })
    }
}

export async function getBlockGuide(req, res) {
    try{
        const id = req.body.id
        await GuideModel.findByIdAndUpdate(id, { $set: { block: true } }).lean()
        res.json({ err: false })
    } catch (err) {
        return res.json({ err: true, message: "Something went wrong", error: err })
    }

}
