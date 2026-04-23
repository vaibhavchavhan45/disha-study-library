import express from "express";
import authMiddleware from "../../../middlewares/authMiddleware.js";
import {
  getWaitingList,
  addWaitingStudent,
  assignWaitingSeat,
  deleteWaitingStudent,
  editWaitingStudent,
} from "../../../controllers/admin/waiting/waitingController.js";

const waitingRoutes = express.Router();

waitingRoutes.get("/",                  authMiddleware, getWaitingList);
waitingRoutes.post("/",                 authMiddleware, addWaitingStudent);
waitingRoutes.put("/:id",              authMiddleware, editWaitingStudent);
waitingRoutes.put("/:id/assign-seat",  authMiddleware, assignWaitingSeat);
waitingRoutes.delete("/:id",           authMiddleware, deleteWaitingStudent);

export default waitingRoutes;