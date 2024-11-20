const mongoose = require("mongoose");

const carSchema = mongoose.Schema(
    {
            title: { type: String, required: true },
            description: { type: String, required: true },
            tags: [String],
            images: [{ type: String }], // Array of image URLs
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);
