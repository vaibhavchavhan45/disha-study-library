import express from "express";
import authMiddleware from "../../../middlewares/authMiddleware.js";
import { getExStudents } from "../../../controllers/admin/exStudents/exStudentController.js";

const exStudentRoutes = express.Router();

exStudentRoutes.get("/", authMiddleware, getExStudents);

export default exStudentRoutes;