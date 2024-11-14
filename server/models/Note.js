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
  send_anon: {
    type: Boolean,
    required: true,
  },
  published_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Note = mongoose.model("note", NoteSchema);
