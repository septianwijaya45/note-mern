const express = require("express");
const {
  getNotes,
  getNoteById,
  deleteNote,
  updateNote,
  createNote,
} = require("../controllers/noteController.js");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

router.route("/").get(protect, getNotes);
router
  .route("/:id")
  .get(protect, getNoteById)
  .delete(protect, deleteNote)
  .put(protect, updateNote);

router.route("/create").post(protect, createNote);

module.exports = router;
