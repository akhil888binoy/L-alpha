import express from "express";
import {
  getFeedSponsors,
  getUserSponsors,
  getSponsorDetails,
  updateSponsor,
  deleteSponsor,
  likeSponsor,
} from "../controllers/sponsors.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

// READ

router.get("/", getFeedSponsors);
router.get("/:userId/sponsors", getUserSponsors);
router.get("/:sponsorId/sponsor", getSponsorDetails);

/*UPDATE*/
router.patch("/:id/like", verifyToken, likeSponsor);
router.patch("/:sponsorId/update", updateSponsor);

// /* DELETE */
router.delete("/:userId/:sponsorId/delete", verifyToken, deleteSponsor);

export default router;
