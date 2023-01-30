const router = require("express").Router()
const body_parser = require("body-parser")
const parser = body_parser.json()
const isAdmin = require("../middlewares/isAdmin.middleware")
const {addVotingArea,listVotingArea} = require("../controllers/voting_area.controller")
const uploader = require('../middlewares/uploader.middleware')
router.route("/voting-area/add")
    .post(isAdmin,uploader.single('photo'),addVotingArea)
router.route("/voting-area/list")
    .get(parser,listVotingArea)
export{}
module.exports = router