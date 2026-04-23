import express from "express";
import { submitFeedbackController } from "../controllers/feedback/feedbackController.js";

const router = express.Router();

router.post("/", submitFeedbackController);

export default router;