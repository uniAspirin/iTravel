import express from "express";
import {
  getAllJourneyPlans,
  getJourneyPlanById,
  createJourneyPlan,
  updateJourneyPlan,
  deleteJourneyPlan,
} from "../controllers/journeyPlanController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const journeyPlanRouter = express.Router();

journeyPlanRouter.get("/", authenticateToken, getAllJourneyPlans);
journeyPlanRouter.get("/:id", authenticateToken, getJourneyPlanById);
journeyPlanRouter.post("/", authenticateToken, createJourneyPlan);
journeyPlanRouter.put("/:id", authenticateToken, updateJourneyPlan);
journeyPlanRouter.delete("/:id", authenticateToken, deleteJourneyPlan);

export { journeyPlanRouter };
