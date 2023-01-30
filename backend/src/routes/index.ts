const express = require("express")
const app=express()

const admin_routes = require("./admin.routes")
const voter_routes = require("./voter.routes")
const voting_area_routes = require("./voting_area.routes")
const election_routes = require("./election.routes")
const party_routes = require("./party.routes")
const candidate_routes = require("./candidate.routes")
const upload_routes = require("./upload.routes")
const sms_verify_routes = require("./sms_verify.routes")
const cast_vote = require('./cast.vote.routes')

app.use("/",admin_routes)
app.use("/",voter_routes)
app.use("/",voting_area_routes)
app.use("/",election_routes)
app.use("/",party_routes)
app.use("/",candidate_routes)
app.use("/",upload_routes)
app.use("/",sms_verify_routes)
app.use('/',cast_vote)


export{}
module.exports = app