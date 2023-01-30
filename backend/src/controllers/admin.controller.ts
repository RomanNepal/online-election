const Admin = require("../models/admin.model")

const addAdmin = async (req:any,res:any,next:any) => {
    let data = req.body
    try{
        let admin_username = await Admin.findOne({user_name:data.user_name});
        if(admin_username){
            next({status:400,msg:"Username Already Registered"})
        }
        else{
            let admin = new Admin(data)
            admin.save()
            res.status(200).json({msg:"Successfully added admin",result:admin})
        }
    } catch(error){
        res.status(500).json({msg:"Error adding admin"})
    }
}

const listAdmins = async (req:any,res:any,next:any)=>{
    try{
        let admins = await Admin.find({})
        res.status(200).json({msg:"Fetched admins",result:admins})
    } catch(error){
        res.status(500).json({msg:"Error listing all admins"})
    }
}

export{}
module.exports = {addAdmin,listAdmins}