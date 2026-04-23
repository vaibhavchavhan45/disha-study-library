import express from "express";
import { getMessageController } from "../controllers/message/messageController.js";

const router = express.Router();

router.post("/", getMessageController);

export default router;