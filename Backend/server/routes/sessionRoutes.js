const express = require("express");
const router = express.Router();
const sessionController = require("../apis/session/sessionController");

// ✅ Teacher creates a session
router.post("/", sessionController.createSession);

// (Optional) Get all sessions
router.get("/", sessionController.getAllSessions);

module.exports = router;
