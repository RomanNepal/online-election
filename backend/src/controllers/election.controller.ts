const Election = require("../models/election.model")

const addElection = (req:any,res:any,next:any) => {
    let data = req.body
    console.log(data)
    try{
        let election = new Election(data)
        election.save()
        res.json({msg:"election added successfully",result:election})
    } catch(error){
        res.status(500).json({msg:"Error adding Election"})
    }
}

const listElection = async (req:any,res:any,next:any) => {
    try{
        let election = await Election.find({})
        res.json({msg:"election fetched successfully",result:election})
    } catch(error){
        res.status(500).json({msg:"Error listing Election"})
    }
}
export{}
module.exports = {addElection,listElection}