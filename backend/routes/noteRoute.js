const express = require("express");
const router = express.Router();
const {
  addNote,
  updateNote,
  deleteNote,
  getAllNotes,
} = require("../controllers/noteCtr");

router.route("/addNote").post(addNote);
router.route("/getNotes").get(getAllNotes);
router.route("/updateNote/:id").patch(updateNote);
router.route("/deleteNote/:id").delete(deleteNote);

module.exports = router;
