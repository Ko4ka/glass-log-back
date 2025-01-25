const express = require("express");
const mongoose = require("mongoose");
const Key = require("../models/Key");

const router = express.Router();

// Fetch all keys
router.get("/", async (req, res) => {
    try {
      const keys = await Key.find();
      res.json(keys); // Ensure quota is included
    } catch (err) {
      console.error("Error fetching keys:", err);
      res.status(500).json({ error: "Failed to fetch keys" });
    }
  });
  

  router.patch("/:id", async (req, res) => {
    const { id } = req.params;
  
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid key ID" });
    }
  
    const updates = req.body;
  
    try {
      const updatedKey = await Key.findByIdAndUpdate(id, updates, { new: true });
      if (!updatedKey) {
        return res.status(404).json({ error: "Key not found" });
      }
  
      res.json(updatedKey);
    } catch (err) {
      console.error("Error updating key:", err);
      res.status(500).json({ error: "Failed to update key" });
    }
  });
  

router.post("/", async (req, res) => {
    const { key, client, weight, votes, quota, admin } = req.body;
  
    try {
      const newKey = new Key({ key, client, weight, votes, quota, admin });
      const savedKey = await newKey.save();
      res.status(201).json(savedKey);
    } catch (err) {
      console.error("Error creating key:", err);
      res.status(500).json({ error: "Failed to create key" });
    }
  });

// Fetch a specific key by its key value
router.get("/:key", async (req, res) => {
  const { key } = req.params;

  try {
    const foundKey = await Key.findOne({ key }); // Find the key by its "key" value
    if (!foundKey) {
      return res.status(404).json({ error: "Key not found" });
    }
    res.json(foundKey);
  } catch (err) {
    console.error("Error fetching key:", err);
    res.status(500).json({ error: "Failed to fetch key" });
  }
});

module.exports = router;
