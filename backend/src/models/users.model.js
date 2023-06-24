/**
 * Created by Mb
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const constants = require("../hardCodedData").constants;
userSchema = new Schema(
  {

    email: {
      type: String,
      lowercase: true,
      default: "",

    },
    password: {
      type: String,
      required: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      unique: true,
      required: true,
    },
    cnic: {
      type: String
    },
    cnic_picture: {
      type: String,
      default: "",

    },
    address: {
      type: String,
      required: true,
    },
    store_name: {
      type: String,
      default: "",
    },
    field: {
      type: String,
      default: "",

    },
    profile: {
      type: String,
      default:
        "https://remapconsulting.com/wp-content/uploads/2018/03/Image-placeholder-man.jpg",
    },
    role: {
      type: String,
      enum: constants.roles,
      required: true,

    },
    sp_type: {
      type: String,
      default: null
    },
    forgotPinCode: {
      type: String,
      default: "",
    },

    changePassword: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("User", userSchema);
