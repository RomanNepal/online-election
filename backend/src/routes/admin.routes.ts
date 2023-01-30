const router = require("express").Router()
const body_parser = require("body-parser")
const parser = body_parser.json()
const {addAdmin,listAdmins} = require("../controllers/admin.controller")
const {adminLogin} = require("../controllers/admin_auth.controller")
const isAdmin = require("../middlewares/isAdmin.middleware")

router.route("/admin/login")
    .post(parser, adminLogin)

router.route("/admin/add")
    .post(isAdmin, parser, addAdmin)

router.route("/admin/list")
    .get(isAdmin, listAdmins)

export { }
module.exports = router