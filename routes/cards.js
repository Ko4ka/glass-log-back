const express = require("express");
const mongoose = require("mongoose");
const Card = require("../models/Card");

const router = express.Router();

// Fetch all cards
router.get("/", async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (err) {
    console.error("Error fetching cards:", err);
    res.status(500).json({ error: "Failed to fetch cards" });
  }
});

// Create a new card
router.post("/", async (req, res) => {
  const { name, description, storypoints, media } = req.body;
  try {
    const newCard = new Card({ name, description, storypoints, media });
    const savedCard = await newCard.save();
    res.status(201).json(savedCard);
  } catch (err) {
    console.error("Error creating card:", err);
    res.status(500).json({ error: "Failed to create card" });
  }
});

// Update a card (e.g., upvote)
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid card ID" });
    }

    const updates = req.body;
    const updatedCard = await Card.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedCard) {
      return res.status(404).json({ error: "Card not found" });
    }

    res.json(updatedCard);
  } catch (err) {
    console.error("Error updating card:", err);
    res.status(500).json({ error: "Failed to update card" });
  }
});

module.exports = router;
