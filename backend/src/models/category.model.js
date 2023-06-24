/**
 * Created by Mb
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
catSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null
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

module.exports = mongoose.model("Category", catSchema);
