import express from "express";
import { submitVerdictController } from "../controllers/verdict/verdictController.js";

const router = express.Router();

router.post("/", submitVerdictController);

export default router;
