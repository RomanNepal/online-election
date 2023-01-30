const jwt = require("jsonwebtoken")
const Admin = require("../models/admin.model")
const CONSTANTS = require("../config/constants")

const generateToken = (data:any) =>{
    let token=jwt.sign(data,CONSTANTS.JWT_SECRET,{expiresIn:'5h'});
    return token;
}

const adminLogin = async (req:any, res:any, next:any) => {
    let data = req.body;
    try{
        let user = await Admin.findOne({user_name:data.username})
        if(!user){
            res.status(404).json({msg:"User not found"})
        } else{
            if(!(data.password == user.password)){
                res.status(400).json({
                    msg:"Password Doesn't match"
                })
            } else{
                let token = generateToken({
                    id:user._id,
                    full_name:user.full_name,
                    user_name:user.user_name
                })
                let response_data = {full_name:user.full_name,user_name:user.user_name}
                res.json({
                    token:token,
                    user:response_data,
                    msg:"You are successfully Logged In"
                }
                )
            }
        }




    } catch(error){
        res.status(500).json({msg:"Error while logging in"})
    }
}

export{}
module.exports = {adminLogin}


