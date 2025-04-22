import express from "express";
import {
  getAllTravelLogs,
  getTravelLogById,
  createTravelLog,
  updateTravelLog,
  deleteTravelLog,
} from "../controllers/travelLogController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const travelLogRouter = express.Router();

travelLogRouter.get("/", authenticateToken, getAllTravelLogs);
travelLogRouter.get("/:id", authenticateToken, getTravelLogById);
travelLogRouter.post("/", authenticateToken, createTravelLog);
travelLogRouter.put("/:id", authenticateToken, updateTravelLog);
travelLogRouter.delete("/:id", authenticateToken, deleteTravelLog);

export { travelLogRouter };
