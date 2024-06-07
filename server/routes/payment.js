import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { makePayment } from "../controllers/payment.js";
const router = express.Router();
router.post("/create-checkout-session", verifyToken, makePayment);
export default router;
