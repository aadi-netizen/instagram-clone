const express = require('express');
const multer = require('multer');


const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }

});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 1
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == image/png || file.mimetype == image/jpg || file.mimetype == image/jpeg) {
            cb(null, true);
        } else {
            cb(null, false);
            return res.status(400).send({ error: "only .png, .jpg and .jpeg file types are allowed." })
        }
    }
});

router.post('/uploadFile', upload.single('file'), function (req, res) {
    res.json({ "fileName": req.file.filename });
});


const downloadFile = (req, res) => {
    const fileName = req.params.fileName;
    const path = _basedir + "/uploads";

    res.download(path + fileName, (error) => {
        if (error) {
            return res.status(500).send({ "msg": "file can not be downloaded as " + error });
        }
    });
};

router.get('/files/:filename', downloadFile);


module.exports = router;