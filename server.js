require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cardsRouter = require("./routes/cards");
const keysRouter = require("./routes/keys"); // Import the keys route

const app = express();
const path = require('path');
const mediaRoutes = require('./routes/media');
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/GlassLog";

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/cards", cardsRouter);
app.use("/api/keys", keysRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/media', mediaRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
