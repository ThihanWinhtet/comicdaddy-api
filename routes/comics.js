const express = require("express");
const { Comic, validateCreate, validateUpdate } = require("../models/comic");
const router = express.Router();

// Creating Comic
router.post("/", async (req, res) => {
  const { error, value } = validateCreate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  try {
    const comic = new Comic(value);
    await comic.save();
    res.send(comic);
  } catch (err) {
    res.status(500).send("internal server error");
  }
});

// Reading Comics
router.get("/", async (req, res) => {
  const comics = await Comic.find();
  if (!comics)
    return res
      .status(404)
      .send(`Something went wrong! There's no comic at all.`);
  res.send(comics);
});

// Reading a Comic
router.get("/:id", async (req, res) => {
  const comic = await Comic.findById(req.params.id);
  if (!comic)
    return res
      .status(404)
      .send(`Can't find anything with the given Id - ${req.params.id}`);
  res.send(comic);
});

// Updating a Comic
router.put("/:id", async (req, res) => {
  const { error, value } = validateUpdate(req.body);
  if (error) return res.send(error.details[0].message);

  try {
    const comic = await Comic.findByIdAndUpdate(req.params.id, value, {
      new: true,
    });
    res.send(comic);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Deleting a Comic
router.delete("/:id", async (req, res) => {
  try {
    const comic = await Comic.findByIdAndDelete(req.params.id);
    if (!comic) return res.status(404).send("Comic not found");
    res.send(comic);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Deleting all Comic by Author Id
router.delete("/", async (req, res) => {
  try {
    const comic = await Comic.deleteMany({ authorId: "testID" });
    if (!comic) return res.status(404).send("Comic not found");
    res.send(comic);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
