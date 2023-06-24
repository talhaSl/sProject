/**
 * Created by Mb
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const constants = require("../hardCodedData").constants;
orderSchema = new Schema(
    {
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            lowercase: true,
            default: "",

        },
        address: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        phone_number: {
            type: String,
            required: true,
        },
        postal_code: {
            type: String,
            required: true,
        },
        products: {
            type:Array
        },
        status:{
            type: String,
            default: "open"
        },
        totalPrice: {
            type: Number,
            required: true
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

module.exports = mongoose.model("Order", orderSchema);
