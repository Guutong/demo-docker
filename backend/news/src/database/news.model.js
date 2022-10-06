const mongoose = require("mongoose");

const NewsSchema = mongoose.Schema(
  {
    title: String,
    description: String,
  },
  { timestamps: true }
);

NewsSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const News = mongoose.model("news", NewsSchema);

module.exports = { News }