const express = require("express");
const router = express.Router();
const attendanceController = require("../apis/attendence/attendenceController");

// Student marks attendance
router.post("/mark", attendanceController.markAttendance);

// Teacher fetches attendance for a session
router.get("/:sessionId", attendanceController.getAttendanceBySession);

module.exports = router;
