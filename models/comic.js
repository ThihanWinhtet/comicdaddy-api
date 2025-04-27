const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const ComicSchema = new Schema({
  id: ObjectId,
  title: { type: String, required: true },
  summary: { type: String, required: true },
  authorId: ObjectId,
  genres: { type: [String], required: true },
  tags: { type: [String] },
  status: { type: Boolean },
  coverImgUrl: { type: String, required: true },
  isPremium: { type: Boolean },
  views: { type: Number },
  likes: { type: Number },
  created_at: { type: Date },
  updated_at: { type: Date },
});

const Comic = mongoose.model("Comic", ComicSchema);

exports.Comic = Comic;
