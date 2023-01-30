const mongoose = require("mongoose")
const dbUrl="mongodb://localhost:27017/election"
mongoose.connect(dbUrl,{
    autoIndex:true,
    autoCreate:true
},(err:any)=>{
    if(!err){
        console.log("Database Connected")
    } else{
        console.log("Database Error")
    }
})

export{}