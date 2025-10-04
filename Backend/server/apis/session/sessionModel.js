const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
<<<<<<< HEAD
  sessionId: { type: String, required: true, unique: true },
  subject: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  day: { type: String, required: true },
  classroom: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Session", sessionSchema);
=======
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "classes", required: true }, // Which class
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "subjects", required: true }, // Which subject
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "teachers", required: true }, // Conducted by teacher
  startTime: { type: Date, required: true }, // Lecture start time
  endTime: { type: Date, required: true },   // Lecture end time

  qrCode: { type: String, default: "" }, // QR code/token for attendance
  status: { 
    type: String, 
    enum: ["scheduled", "ongoing", "completed", "cancelled"], 
    default: "scheduled" 
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("sessions", sessionSchema);
>>>>>>> 22207ae0c04ca9a4d7de3405e625a4adf6c1d31b
