const express = require("express");
const multer = require("multer");
const path = require("path");
const nanoid = require("nanoid");

const config = require("../config");
const Artist = require("../models/Artist");

const storage = multer.diskStorage({
    destination(req, file, cd){
        cd(null, config.uploadPath)
    },
    filename(req, file, cd){
        cd(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

const router = express.Router();

router.get("/", (req, res) => {
    Artist.find()//.populate('category')
        .then( results => res.send(results))
        .catch(e => res.send(e).status(500))
});

router.post("/", upload.single("image"), (req, res) => {

    const data = req.body;
    if (req.file) data.image = req.file.filename;

    const artist = new Artist(data);
    artist.save()
        .then((result) => res.send(result))
        .catch(error => res.status(400).send(error));

});

module.exports = router;