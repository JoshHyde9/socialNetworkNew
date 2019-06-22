const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
