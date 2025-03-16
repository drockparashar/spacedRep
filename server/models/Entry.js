const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  topic: String,
  dateLearned: Date,
  nextReviewDate: Date,
  reviewIntervals: { type: [Number], default: [1, 3, 7, 14, 30] }, 
  currentIntervalIndex: { type: Number, default: 0 },
  lastReviewed: Date,
});

module.exports = mongoose.model("Entry", entrySchema);
