const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const ComicSchema = new Schema(
  {
    id: ObjectId,
    title: { type: String, required: true },
    summary: { type: String, required: true },
    // authorId: ObjectId,
    authorId: { type: String, required: true },
    genres: { type: [String], required: true },
    tags: { type: [String] },
    status: { type: Boolean, default: true },
    coverImgUrl: { type: String, required: true },
    isPremium: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Comic = mongoose.model("Comic", ComicSchema);

function buildComicSchema(isRequired = false) {
  const require = (schema) => (isRequired ? schema.required() : schema);

  return Joi.object({
    title: require(Joi.string()),
    summary: require(Joi.string()),
    // authorId: ObjectId,
    authorId: require(Joi.string()),
    genres: Joi.array().items(Joi.string()),
    tags: Joi.array().items(Joi.string()),
    status: Joi.boolean(),
    coverImgUrl: require(Joi.string()),
    isPremium: Joi.boolean(),
    views: Joi.number().integer(),
    likes: Joi.number().integer(),
  });
}

function validateComicCreate(customer) {
  return buildComicSchema(true).validate(customer);
}

function validateComicUpdate(customer) {
  return buildComicSchema(true).validate(customer);
}

exports.Comic = Comic;
exports.validateCreate = validateComicCreate;
exports.validateUpdate = validateComicUpdate;
