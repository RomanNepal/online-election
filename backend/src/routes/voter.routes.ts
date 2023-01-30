const router = require("express").Router()
const body_parser = require("body-parser")
const parser = body_parser.json()
const isAdmin = require("../middlewares/isAdmin.middleware")
const { addVoter, listVoters, getVoterById, updateVoter } = require("../controllers/voter.controller")
const uploader = require("../middlewares/uploader.middleware")

router.route("/voter/add")
    .post(isAdmin, uploader.single('photo'), addVoter)

router.route("/voter/list")
    .get(isAdmin, listVoters)
router.route('/voter/update/:id').put(parser, updateVoter)
router.route("/voter/:id")
    .get(parser, getVoterById)
export { }
module.exports = router