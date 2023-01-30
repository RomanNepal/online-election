const jwt = require("jsonwebtoken")
const Voter = require("../models/voter.model")
let CONSTANTS = require("../config/constants")

const isVoter = async (req:any,res:any,next:any)=>{
    let token = '';
    if(req.headers['authorization']){
        token = req.headers['authorization']
    }
    try{
        let data=jwt.verify(token,CONSTANTS.JWT_SECRET);
        let voter = await Voter.findById(data.id)
        if(!token || !data || !voter){
            next({
                status: 401,
                msg:"Unauthorized Accesss"
            })
        }
        else{
            req.auth_user=voter
            next()
        }

    } catch(error){
        res.status(500).json({msg:"Unauthorized access"})
    }
}

export{}
module.exports = isVoter