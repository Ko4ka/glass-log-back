const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
  storypoints: { type: Number, required: true },
  media: { type: [String], default: [] },
});

module.exports = mongoose.model("Card", cardSchema);
