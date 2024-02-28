import express from "express";
import {
  getFeedEvents,
  getUserEvents,
  likeEvent,
  getEventDetails,
  deleteEvent,
  updateEvent,
} from "../controllers/events.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*READ*/
router.get("/", getFeedEvents);
router.get("/:userId/events", getUserEvents);
router.get("/:eventId/event", getEventDetails);

/*UPDATE*/
router.patch("/:id/like", verifyToken, likeEvent);
router.patch("/:eventId/update", verifyToken, updateEvent); // Define the update route

/* DELETE */
router.delete("/:userId/:eventId/delete", verifyToken, deleteEvent);

export default router;
