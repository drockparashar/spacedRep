const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, // Hashed password for JWT authentication
  notificationTime: { type: String, default: "08:00 AM" }, // Preferred reminder time
});

module.exports = mongoose.model("User", userSchema);
