<<<<<<< HEAD
const Attendance = require("./attendenceModel");
const Session = require("../session/sessionModel");

// ✅ Mark Attendance
exports.markAttendance = async (req, res) => {
  try {
    const { studentId, sessionId } = req.body;

    if (!studentId || !sessionId) {
      return res.status(400).json({ error: "Missing studentId or sessionId" });
    }

    // Check if session exists
    const session = await Session.findOne({ sessionId });
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    // Save attendance (unique constraint prevents duplicates)
    const attendance = new Attendance({ studentId, sessionId });
    await attendance.save();

    res.status(201).json({ message: "Attendance marked successfully", attendance });
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error
      return res.status(200).json({ message: "Attendance already marked" });
    }
    console.error("Error marking attendance:", err);
    res.status(500).json({ error: "Failed to mark attendance" });
  }
};

// ✅ Get Attendance by Session
exports.getAttendanceBySession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const records = await Attendance.find({ sessionId });
    res.json(records);
  } catch (err) {
    console.error("Error fetching attendance:", err);
    res.status(500).json({ error: "Failed to fetch attendance" });
  }
};
=======
// const mongoose = require("mongoose");
// const attendanceModel = require("../models/attendanceModel"); // adjust path if needed

// const addAttendance = (req, res) => {
//     var errMsgs = [];

//     // Validate required fields
//     if (!req.body.sessionId) {
//         errMsgs.push("sessionId is required!!");
//     } else if (!mongoose.Types.ObjectId.isValid(req.body.sessionId)) {
//         errMsgs.push("sessionId is invalid!!");
//     }

//     if (!req.body.classId) {
//         errMsgs.push("classId is required!!");
//     } else if (!mongoose.Types.ObjectId.isValid(req.body.classId)) {
//         errMsgs.push("classId is invalid!!");
//     }

//     if (!req.body.studentId) {
//         errMsgs.push("studentId is required!!");
//     } else if (!mongoose.Types.ObjectId.isValid(req.body.studentId)) {
//         errMsgs.push("studentId is invalid!!");
//     }

//     // Validate status
//     if (req.body.status && !["present", "absent"].includes(req.body.status)) {
//         errMsgs.push("status must be either 'present' or 'absent'!!");
//     }

//     if (errMsgs.length > 0) {
//         return res.send({ status: 422, success: false, message: errMsgs });
//     }

//     let attendanceObj = new attendanceModel();
//     attendanceObj.sessionId = req.body.sessionId;
//     attendanceObj.classId = req.body.classId;
//     attendanceObj.studentId = req.body.studentId;
//     attendanceObj.status = req.body.status || "absent";
//     if (req.body.meta) attendanceObj.meta = req.body.meta;

//     attendanceObj.save()
//         .then((attendanceData) => {
//             res.send({
//                 status: 200,
//                 success: true,
//                 message: "Attendance added successfully!!",
//                 data: attendanceData
//             });
//         })
//         .catch((err) => {
//             console.error("Error adding attendance:", err);
//             // handle duplicate attendance error
//             if (err.code === 11000) {
//                 return res.send({
//                     status: 409,
//                     success: false,
//                     message: "Attendance already marked for this student in this session!!"
//                 });
//             }
//             res.send({ status: 500, success: false, message: "Something went wrong!!" });
//         });
// };

// module.exports = { addAttendance };
>>>>>>> 22207ae0c04ca9a4d7de3405e625a4adf6c1d31b
