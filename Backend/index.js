const express = require("express");
const app = express();
const db = require("./server/config/db");
const cors = require("cors");

app.use(cors({ origin: ["http://localhost:3000", "http://localhost:5173"], credentials: true }));

<<<<<<< HEAD
=======
const adminroutes = require("./server/routes/adminRoutes")
app.use("/adminapis",adminroutes)
const teacherroutes = require("./server/routes/teacherRoutes")
app.use("/teacherapis",teacherroutes)
const studentroutes = require("./server/routes/studentRoutes")
app.use("/studentapis",studentroutes)
app.listen(5000,(err)=>{
    if(err)
        {
            console.log("server error",err)
        }
>>>>>>> 22207ae0c04ca9a4d7de3405e625a4adf6c1d31b

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "40mb" }));

const seeder = require("./server/config/seeder");
seeder.adminreg();

// ✅ Mount Routes only once
const studentRoutes = require("./server/routes/studentRoutes");
const sessionRoutes = require("./server/routes/sessionRoutes");
const attendanceRoutes = require("./server/routes/attendanceRoutes");

app.use("/apis/attendance", attendanceRoutes);
app.use("/apis/students", studentRoutes);
app.use("/apis/sessions", sessionRoutes);

app.listen(5000, (err) => {
  if (err) {
    console.log("server error", err);
  } else {
    console.log("🚀 server is connected on http://localhost:5000");
  }
});
