const router = require("express").Router()
const upload_photo  = require("../controllers/upload.controller")
const isAdmin  = require("../middlewares/isAdmin.middleware")
const uploader = require("../middlewares/uploader.middleware")

router.route('/upload')
    .post(isAdmin,uploader.single('image'),upload_photo)

module.exports = router