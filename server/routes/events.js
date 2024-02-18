import express from "express";
import {
  getFeedEvents,
  getUserEvents,
  likeEvent,
  getEventDetails,
} from "../controllers/events.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*READ*/
router.get("/", getFeedEvents);
router.get("/:userId/events", verifyToken, getUserEvents);
router.get("/:eventId/event", getEventDetails);

/*UPDATE*/
router.patch("/:id/like", verifyToken, likeEvent);

export default router;
