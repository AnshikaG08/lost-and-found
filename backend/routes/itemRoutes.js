const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const auth = require("../middleware/authMiddleware");

// Add item
router.post("/", auth, async (req, res) => {
  const item = await Item.create({ ...req.body, user: req.user });
  res.json(item);
});

// Get all
router.get("/", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// Get by id
router.get("/:id", async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.json(item);
});

// Update
router.put("/:id", auth, async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

// Delete
router.delete("/:id", auth, async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

// Search
router.get("/search/:name", async (req, res) => {
  const items = await Item.find({
    itemName: { $regex: req.params.name, $options: "i" }
  });
  res.json(items);
});

module.exports = router;