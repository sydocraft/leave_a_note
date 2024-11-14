const express = require("express");
const router = express.Router();

// Load Book model
const Note = require("../../models/Note");

// @route   GET api/books/test
// @desc    Tests books route
// @access  Public
router.get("/test", (req, res) => res.send("note route testing!"));

// @route   GET api/books
// @desc    Get all books
// @access  Public
router.get("/", (req, res) => {
  Note.find()
    .then((notes) => res.json(notes))
    .catch((err) => res.status(404).json({ nonotesfound: "No notes found" }));
});

// @route   GET api/books/:id
// @desc    Get single book by id
// @access  Public
router.get("/:id", (req, res) => {
  Note.findById(req.params.id)
    .then((note) => res.json(note))
    .catch((err) => res.status(404).json({ nonotefound: "No notes found" }));
});

// @route   POST api/books
// @desc    Add/save book
// @access  Public
router.post("/", (req, res) => {
  Note.create(req.body)
    .then((note) => res.json({ msg: "Notes added successfully" }))
    .catch((err) => res.status(400).json({ error: "Unable to add this note" }));
});

// @route   PUT api/books/:id
// @desc    Update book by id
// @access  Public
router.put("/:id", (req, res) => {
  Note.findByIdAndUpdate(req.params.id, req.body)
    .then((note) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route   DELETE api/books/:id
// @desc    Delete book by id
// @access  Public
router.delete("/:id", (req, res) => {
  Note.findByIdAndDelete(req.params.id)
    .then((note) => res.json({ mgs: "Note entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such note" }));
});

module.exports = router;
