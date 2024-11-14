const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  recipient_name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  sender_name: {
    type: String,
  },
  published_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Note = mongoose.model("note", NoteSchema);
