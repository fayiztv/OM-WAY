import GuideModel from "../models/GuideModel.js";
import UserModel from "../models/UserModel.js";
import sentMail from '../helpers/sentMail.js'
import sentRejection from '../helpers/SentRejection.js'

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
        res.cookie("userToken", "", {
            httpOnly: true,
            expires: new Date(0),
            secure: true,
            sameSite: "none",
        }).json({ message: "logged out", error: false })
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

export async function getunBlockGuide(req, res) {
    try{
        const id = req.body.id
        await GuideModel.findByIdAndUpdate(id, { $set: { block: false } }).lean()
        res.json({ err: false })
    } catch (err) {
        return res.json({ err: true, message: "Something went wrong", error: err })
    }
}

export async function getAdminRegistrations(req, res) {

    try {
        const name = req.query.name ?? ""
        let registrations = await GuideModel.find({ firstName: new RegExp(name, 'i'),active:false}).lean()
        res.json(registrations)

    } catch (err) {
        return res.json({ err: true, message: "Something went wrong", error: err })
    }
}

export async function getAcceptRegistration(req, res) {
    try{
        const id = req.body.id
        const guide =  await GuideModel.findByIdAndUpdate(id, { $set: { active: true } }).lean()
        let Sent = await sentMail(guide.email)
        res.json({ err: false })
    } catch (err) {
        return res.json({ err: true, message: "Something went wrong", error: err })
    }

}

export async function getRejectRegistration(req, res) {
    try{
        const id = req.body.id
        const message = req.body.text
        console.log(id+"            "+message);
        const guide = await GuideModel.findOne({ _id: id }).lean()
        let Sent = await sentRejection(guide.email,message)
        await GuideModel.deleteOne({_id:id})
        res.json({ err: false })
    } catch (err) {
        return res.json({ err: true, message: "Something went wrong", error: err })
    }
}