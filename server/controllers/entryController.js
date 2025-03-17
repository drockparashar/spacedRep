const Entry = require("../models/Entry");

// Add a new learning entry
exports.addEntry = async (req, res) => {
  const { topic } = req.body;
  const userId = req.user.userId;
  const today = new Date();

  const entry = new Entry({
    userId,
    topic,
    dateLearned: today,
    nextReviewDate: new Date(today.setDate(today.getDate() + 1)),
  });

  await entry.save();
  res.status(201).json({ message: "Entry added", entry });
};

exports.getDueEntries = async (req, res) => {
    const userId = req.user.userId;
    const today = new Date().toISOString().split("T")[0];
  
    const entries = await Entry.find({ userId, nextReviewDate: { $lte: today } });
    res.json(entries);
  };

  exports.reviewEntry = async (req, res) => {
    const { id } = req.params;
    const { difficulty } = req.body;
  
    const entry = await Entry.findById(id);
    if (!entry) return res.status(404).json({ message: "Entry not found" });
  
    let { currentIntervalIndex, reviewIntervals } = entry;
  
    if (difficulty === "easy") {
      currentIntervalIndex = Math.min(currentIntervalIndex + 2, reviewIntervals.length - 1);
    } else if (difficulty === "normal") {
      currentIntervalIndex = Math.min(currentIntervalIndex + 1, reviewIntervals.length - 1);
    } else if (difficulty === "hard") {
      currentIntervalIndex = 0;
    }
  
    entry.currentIntervalIndex = currentIntervalIndex;
    entry.lastReviewed = new Date();
    entry.nextReviewDate = new Date();
    entry.nextReviewDate.setDate(entry.lastReviewed.getDate() + reviewIntervals[currentIntervalIndex]);
  
    await entry.save();
    res.json({ message: "Entry updated", entry });
  };
  
