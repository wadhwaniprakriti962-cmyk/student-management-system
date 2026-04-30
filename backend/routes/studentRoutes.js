const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// CREATE
router.post("/", async (req, res) => {
  try {
    const student = req.body;

    const data = await Student.create(student);

    res.status(201).json(data); // return saved DB object
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Student.findOneAndUpdate(
      { student_id: req.params.id },
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Student.findOneAndDelete({
      student_id: req.params.id,
    });

    res.json({ message: "Student record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;