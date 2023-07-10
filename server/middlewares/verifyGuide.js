import jwt from "jsonwebtoken";
import GuideModel from "../models/GuideModel.js";

const verifyGuide = async (req, res, next) => {
    try {
        const token = req.cookies.guideToken;
        if (!token)
            return res.json({ loggedIn: false, error: true, message: "no token" });

        const verifiedJWT = jwt.verify(token, "myJwtSecretKey");
        const guide = await GuideModel.findOne({_id:verifiedJWT.id}, { password: 0 });
        if (!guide) {
            return res.json({ loggedIn: false });
        }
        req.guide = guide;
        next()
    } catch (err) {
        console.log(err)
        res.json({ loggedIn: false, error: err });
    }
}
export default verifyGuide