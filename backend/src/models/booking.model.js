/**
 * Created by Mb
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
bookSchema = new Schema(
    {
        providerId: {
            type: Schema.Types.ObjectId,
            default: null,
            ref: "User"
        },
        bookerId: {
            type: Schema.Types.ObjectId,
            default: null,
            ref: "User"
        },
        price: {
            type: String,
            default: null
        },
        message: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: "open"
        },
        package: {
            type: String,
            default: ""
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

module.exports = mongoose.model("Booking", bookSchema);
