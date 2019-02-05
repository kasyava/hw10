const express = require("express");
const multer = require("multer");
const path = require("path");
const nanoid = require("nanoid");

const config = require("../config");
const Track = require("../models/Track");

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
    if(req.query.album){
        Track.find({album: req.query.album}).populate('album')
            .then(results => res.send(results))
            .catch(e => res.send(e).status(400));
    }
    else {
        Track.find().populate('album')
            .then(results => res.send(results))
            .catch(e => res.send(e).status(400));
    }
});


router.post("/", upload.none(), (req, res) => {
    console.log(req.body);

    const track = new Track(req.body);
    track.save()
        .then((result) => res.send(result))
        .catch(error => res.status(400).send(error));

});

module.exports = router;