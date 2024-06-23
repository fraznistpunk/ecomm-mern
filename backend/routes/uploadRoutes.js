import path from "path";
import express from "express";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, 'uploads/'); // null is for error.
    },
    filename(req, file, callback) {
        let newFileName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
        callback(null, newFileName);
    }
});

function checkFileType(file, callback) {
    const fileTypes = /jpg|jpeg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = filetypes.mimeType(file.mimetype);
    if(extname && mimeType) {
        return callback(null, true);
    } else {
        callback("Images only!");
    }
}
const upload = multer({
    storage,
}); 

router.post('/', upload.single('image'), (req, res) => {
    res.send({
        message : "Image uploaded",
        image : `/${req.file.path}`,
    });
});

export default router;