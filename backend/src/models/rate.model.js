/**
 * Created by Mb
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
rateSchema = new Schema(
    {
        hourly: {
            type: Number,
            required: true,
        },
        daily: {
            type: Number,
            required: true,
        },
        contract: {
            type: Number,
            required: true,
        },
        discription: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            default: "",
        },

        isActive: { type: Boolean, default: true },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

module.exports = mongoose.model("Rate", rateSchema);
