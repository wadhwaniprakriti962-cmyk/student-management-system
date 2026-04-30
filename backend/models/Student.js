const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  student_name: String,
  student_id: String,
  phone: String,
});

module.exports = mongoose.model("Student", studentSchema);