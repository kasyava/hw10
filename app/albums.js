const express = require("express");
const multer = require("multer");
const path = require("path");
const nanoid = require("nanoid");

const config = require("../config");
const Album = require("../models/Album");

const storage = multer.diskStorage({
    destination(req, file, cd){
        cd(null, config.uploadPath)
    },
    filename(req, file, cd){
        cd(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

const createRouter = () => {
    const router = express.Router();

    router.get("/", (req, res) => {
        Album.find().populate('artist')
            .then(results => res.send(results))
            .catch(e => res.send(e).status(500))
    });

    router.post("/", upload.single("image"), (req, res) => {
        console.log(req.body);

        const data = req.body;
        if (req.file) data.image = req.file.filename;


        const album = new Album(data);
        album.save()
            .then((result) => res.send(result))
            .catch(error => res.send(error).status(400));

    });

    return router;
}
module.exports = createRouter;