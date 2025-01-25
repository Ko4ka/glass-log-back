const mongoose = require("mongoose");

const KeySchema = new mongoose.Schema({
  key: { type: String, required: true },
  client: { type: String, required: true },
  weight: { type: Number, required: true },
  votes: { type: Number, required: true },
  quota: { type: Number, required: true },
  admin: { type: Boolean, required: true, default: false }, // New admin field
});

module.exports = mongoose.model("Key", KeySchema);
