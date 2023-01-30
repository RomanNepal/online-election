const CONSTANTS=require("../config/constants")
const axios = require("axios")
const Voter = require("../models/voter.model")
const Verify = require("../models/verification.model")
const jwt = require("jsonwebtoken")

const generateToken = (data:any) =>{
    let token=jwt.sign(data,CONSTANTS.JWT_SECRET);
    return token;
}

const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000);
}

const sendSms = async (req:any,res:any,next:any) => {
    let data=req.body
    let otp = generateOTP().toString()
   
    try{
        let voter = await Voter.findOne({voter_id:data.voter_id})
        if(!voter){
            res.status(401).json({msg:"Voter with such voter id doesn't exist"})
        } else{
            
            await axios.post('https://sms.aakashsms.com/sms/v3/send',{
            auth_token:CONSTANTS.sms_auth_token,
            to:voter.phone,
            text: `Your OTP for Verification is ${otp}. - Election Software`
            })
            
            res.json({
                msg:"OTP sent to your registered number, verify to vote"
            })
            let existing_phone = await Verify.findOne({phone:voter.phone})
            if(!existing_phone){
                let save_otp = new Verify({phone:voter.phone,otp:otp})
                save_otp.save()
            } else{
                await Verify.findOneAndUpdate({phone:voter.phone},{otp:otp})
            }
        }
    }

    catch(error){
        next({msg:"Error sending otp"})
    }
}

const verifyPhone = async (req:any,res:any,next:any) => {
    let data = req.body
    try{
        let user_otp = data.otp
        let voter_id = data.voter_id.toString()
        let voter = await Voter.findOne({voter_id:voter_id}).populate('voting_area')
        let actual_otp = await Verify.findOne({phone:voter.phone})

        if(actual_otp.otp==user_otp){
            let token = generateToken({
                id:voter._id,
                full_name:voter.full_name,
                gender:voter.gender,    
            })
            
            res.json({
                token:token,
                user:voter,
                msg:"OTP Verified and Successfully logged in as voter"
            }
            )
            await Verify.findOneAndDelete({phone:voter.phone})
        } else{
            res.status(401).json({msg:"Enter the correct OTP for verification"})
        }


    } catch(error){
        next({msg:"Error while verifying user, try sending otp again"})
    }
}




module.exports = {sendSms,verifyPhone}
export{}