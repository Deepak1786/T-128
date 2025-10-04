<<<<<<< HEAD
const Session = require("./sessionModel");

// Create Session
exports.createSession = async (req, res) => {
  try {
    const { sessionId, subject, date, time, day, classroom } = req.body;

    if (!sessionId || !subject || !date || !time || !day) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newSession = new Session({ sessionId, subject, date, time, day, classroom });
    await newSession.save();

    res.status(201).json({ message: "Session created successfully", session: newSession });
  } catch (err) {
    console.error("Error creating session:", err);

    if (err.code === 11000) {
      return res.status(400).json({ error: "Session ID already exists" });
    }

    res.status(500).json({ error: "Failed to create session", details: err.message });
  }
};

// Get All Sessions (optional)
exports.getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find();
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
};
=======
// const sessionModel = require("../models/sessionModel"); // adjust path if needed

// const addSession = (req, res) => {
//     var errMsgs = [];

//     // Validate required fields
//     if (!req.body.classId) errMsgs.push("classId is required!!");
//     if (!req.body.subjectId) errMsgs.push("subjectId is required!!");
//     if (!req.body.teacherId) errMsgs.push("teacherId is required!!");
//     if (!req.body.startTime) errMsgs.push("startTime is required!!");
//     if (!req.body.endTime) errMsgs.push("endTime is required!!");

//     if (errMsgs.length > 0) {
//         return res.send({ status: 422, success: false, message: errMsgs });
//     }

//     let sessionObj = new sessionModel();
//     sessionObj.classId = req.body.classId;
//     sessionObj.subjectId = req.body.subjectId;
//     sessionObj.teacherId = req.body.teacherId;
//     sessionObj.startTime = req.body.startTime;
//     sessionObj.endTime = req.body.endTime;
//     if (req.body.qrCode) sessionObj.qrCode = req.body.qrCode;
//     sessionObj.status = req.body.status || "scheduled";

//     sessionObj.save()
//         .then((sessionData) => {
//             res.send({
//                 status: 200,
//                 success: true,
//                 message: "Session added successfully!!",
//                 data: sessionData
//             });
//         })
//         .catch((err) => {
//             console.error("Error adding session:", err);
//             res.send({ status: 500, success: false, message: "Something went wrong!!" });
//         });
// };

// module.exports = { addSession };
>>>>>>> 22207ae0c04ca9a4d7de3405e625a4adf6c1d31b
