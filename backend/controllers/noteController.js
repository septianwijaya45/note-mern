const Note = require("../models/noteModel");
const expressAsyncHandler = require("express-async-handler");

/* Get All Note */
const getNotes = expressAsyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
});

/** Get Note By Id */
const getNoteById = expressAsyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note Not Found!" });
  }
});

/** Create Note */
const createNote = expressAsyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please Fill All the Fields!");
  } else {
    const note = new Note({
      user: req.user._id,
      title,
      content,
      category,
    });

    const createNote = await note.save();

    res.status(201).json(createNote);
  }
});

/** Update Note */
const updateNote = expressAsyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You Can't Perform This Action!");
  }

  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;

    const updateNote = await note.save();
    res.json(updateNote);
  } else {
    res.status(404);
    throw new Error("Note Not Found!");
  }
});

/** Delete Note */
const deleteNote = expressAsyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Can't perform this action!");
  }

  if (note) {
    await note.remove();
    res.json({ message: "Note Removed!" });
  } else {
    res.status(404);
    throw new Error("Note Not Found");
  }
});

module.exports = {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};
