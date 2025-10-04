// src/pages/student/StudentScanner.jsx
import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { Button, Alert, Card } from "react-bootstrap";

export default function StudentScanner() {
  const [scannedData, setScannedData] = useState(null);
  const [studentId, setStudentId] = useState("");
  const [sessionId, setSessionId] = useState(""); // auto-filled after scan
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [scanned, setScanned] = useState(false);

  // Process scanned QR text
  const processScan = async (rawText) => {
    try {
      let parsedData;
      try {
        parsedData = JSON.parse(rawText); // if QR contains JSON
      } catch {
        parsedData = { sessionId: rawText.trim() }; // fallback plain text
      }

      // Save scanned session
      setScannedData(parsedData);
      setSessionId(parsedData.sessionId || "");
      setScanned(true);
      setMessage("Scanned session. Verifying...");
      setError(null);

      if (!studentId) {
        setMessage(null);
        setError("Please enter your Student ID first!");
        return;
      }

      // ✅ Send attendance mark request
      const response = await fetch("http://localhost:5000/apis/attendance/mark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          sessionId: parsedData.sessionId,
          status: "Present",
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Attendance marked ✅");
        setError(null);
      } else {
        setMessage(null);
        setError(data.message || "Could not mark attendance ❌");
      }
    } catch (err) {
      console.error("QR Scan error:", err);
      setMessage(null);
      setError("Invalid QR Code ❌");
    }
  };

  // Reset scanner
  const reset = () => {
    setScanned(false);
    setMessage(null);
    setError(null);
    setScannedData(null);
    setSessionId("");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">🎓 Student Attendance Scanner</h2>

      <Card className="p-4 shadow mt-4" style={{ maxWidth: 600, margin: "auto" }}>
        <div className="mb-3">
          {/* Student ID input */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />

          {/* Session ID auto-filled */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Session ID (auto-filled after scan)"
            value={sessionId}
            readOnly
          />
        </div>

        {/* QR Scanner */}
        {!scanned ? (
          <>
            <p className="text-muted text-center">
              📷 Point your camera at the teacher's QR code.
            </p>
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <Scanner
                onDecode={(rawText) => {
                  if (rawText) processScan(rawText); // ✅ FIXED
                }}
                onError={(error) => console.error("Scanner error:", error)}
                style={{ width: "300px" }}
              />
            </div>
          </>
        ) : (
          <>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            {/* Show session details if present in QR */}
            {scannedData && (
              <div className="mt-3 text-start">
                <h5>📌 Session Details</h5>
                <p><strong>Session ID:</strong> {scannedData.sessionId}</p>
                {scannedData.subject && <p><strong>Subject:</strong> {scannedData.subject}</p>}
                {scannedData.date && <p><strong>Date:</strong> {scannedData.date}</p>}
                {scannedData.time && <p><strong>Time:</strong> {scannedData.time}</p>}
                {scannedData.classroom && <p><strong>Classroom:</strong> {scannedData.classroom}</p>}
                {scannedData.day && <p><strong>Day:</strong> {scannedData.day}</p>}
              </div>
            )}

            <Button variant="secondary" onClick={reset} className="mt-3">
              🔄 Scan Again
            </Button>
          </>
        )}
      </Card>
    </div>
  );
}
