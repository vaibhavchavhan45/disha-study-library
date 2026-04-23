import express from "express";
import authMiddleware from "../../../middlewares/authMiddleware.js";
import {
  getSeats,
  assignSeat,
  removeSeat,
  replaceSeat,
  editSeat,
} from "../../../controllers/admin/seats/seatController.js";

const seatRoutes = express.Router();

seatRoutes.get("/",             authMiddleware, getSeats);
seatRoutes.put("/:id/assign",  authMiddleware, assignSeat);
seatRoutes.put("/:id/remove",  authMiddleware, removeSeat);
seatRoutes.put("/:id/replace", authMiddleware, replaceSeat);
seatRoutes.put("/:id/edit",    authMiddleware, editSeat);

export default seatRoutes;