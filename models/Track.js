const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    album:{
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true
    },
    duration: Number
});

const Track = mongoose.model('Track', TrackSchema);

module.exports = Track;