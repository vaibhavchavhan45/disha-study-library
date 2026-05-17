import express from "express";
import cors from "cors";
import otpRoutes from "./routes/otpRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import config from "./config/config.js";
import authRoutes from "./routes/admin/auth/authRoutes.js";
import seatRoutes from "./routes/admin/seats/seatRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import waitingRoutes from "./routes/admin/waiting/waitingRoutes.js";
import exStudentRoutes from "./routes/admin/exStudents/exStudentRoutes.js";
import inquiryRoutes from "./routes/admin/inquiries/inquiryRoutes.js";
import dashboardRoutes from "./routes/admin/dashboard/dashboardRoutes.js";

import verdictRoutes from "./routes/verdictRoutes.js";

const app = express();
const { port } = config;

app.use(cors());
app.use(express.json());

app.use("/api/otp", otpRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/feedback", feedbackRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/seats", seatRoutes);

app.use("/api/waiting", waitingRoutes);
app.use("/api/ex-students", exStudentRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use("/api/verdict", verdictRoutes);

app.get("/health", (req, res) => res.send("OK"));

app.use(errorHandler);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});