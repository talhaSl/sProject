/**
 * Created by Mb
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
proSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    discription: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: null
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    cat_id: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
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

module.exports = mongoose.model("Product", proSchema);
