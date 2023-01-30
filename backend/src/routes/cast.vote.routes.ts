const router = require("express").Router()
const body_parser = require("body-parser")
const parser = body_parser.json()
const isAdmin = require("../middlewares/isAdmin.middleware")
const {addVote, listVote} = require('../controllers/cast.vote.controller copy')
const uploader = require("../middlewares/uploader.middleware")

router.route("/vote/add")
    .post(parser,addVote)

    router.route('/vote/list').get(listVote)
// router.route("/vote/list")
//     .get(parser,listElection)
export{}
module.exports = router