const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoSchema = new mongoose.Schema(
    {
        page_id: { type: Schema.Types.ObjectId, ref: 'Page' },
        video_id: { type: String, required: true },
        updated_time: { type: String, required: false },
        views: { type: Number, required: false },
        length: { type: Number, required: false },
        thumbnails: {
            id: { type: String, required: false }
        }
    },
    { timestamps: true }
);


const Video = mongoose.model("Video", VideoSchema);
module.exports = Video;