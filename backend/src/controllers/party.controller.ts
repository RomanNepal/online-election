const Party = require("../models/party.model")

const addParty = (req:any,res:any,next:any) => {
    let data = req.body
    if(req.file){
        data.party_symbol = req.file.filename
       }
       console.log(data.party_symbol)
    try{
        let party = new Party(data)
        party.save()
        res.json({msg:"Party added",result:party})
    } catch(error){
        res.status(500).json({msg:"Error adding party"})
    }

}

const listParty = async (req:any, res:any, next:any) => {
    try{
        let party = await Party.find({})
        res.json({msg:"Parties fetched",result:party})

    } catch(error){
        res.status(500).json({msg:"Error listing party"})
    }
}






export{}
module.exports = {addParty,listParty}