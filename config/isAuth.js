const jwt=require('jsonwebtoken');
const User=require('../models/users');
require('dotenv').config();
const auth = async (req, res, next) => {
    try {
        // console.log("!1st check");
        const token =req.cookies.jwt;
        // console.log("THis is empty"+token);
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        // console.log('Hello');
        const user=await User.findOne({_id:decode._id,'tokens.token':token});
        if(!user){
            throw new Error();
        }
        req.token=token;
        req.user=user;
        next();
    }
    catch (e) {
        res.status(401).send({error:'Please Authanticate'})
    }
}

module.exports = auth;