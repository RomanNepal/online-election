const CONSTANTS = require("../config/constants");
const Image = require("../models/image.model")
const upload_photo = (req: any, res: any, next: any) => {
    let user = req.auth_user;
    let data = req.body;
    try {
        if (req.file) {
            data.image = req.file.filename;
        }
        let image_data = { title: data.image, uploaded_by: user.id }
        let uploaded_image = new Image(image_data)
        uploaded_image.save()
        res.json({ msg: "Image uploaded successfully", image: uploaded_image, url: CONSTANTS.host + data.image })
    } catch (error) {
        next({ msg: "Error uploading photo" })
    }
}

module.exports = upload_photo
export { }