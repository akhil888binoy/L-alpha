import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import userRoutes from "./routes/users.js";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import eventRoutes from "./routes/events.js";
import sponsorRoutes from "./routes/sponsors.js";
import paymentRoutes from "./routes/payment.js";
import { verifyToken } from "./middleware/auth.js";
import { createEvent } from "./controllers/events.js";
import { createSponsor } from "./controllers/sponsors.js";
import User from "./models/User.js";
import Event from "./models/Event.js";
import Sponsor from "./models/Sponsor.js";
import { users, events, sponsors } from "./data/index.js";
import { verify } from "crypto";
/*CONFIGURATION*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/*FILE STORAGE*/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/*ROUTES WITH FILES*/
app.post("/auth/register", upload.single("picture"), register);
app.post("/events", verifyToken, upload.single("picture"), createEvent);
app.post("/sponsors", upload.single("picture"), createSponsor);
/*ROUTES*/
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use("/sponsors", sponsorRoutes);
app.use("/payment", paymentRoutes);

/* MONGOOSE SETUP*/
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server Port : ${PORT} running successfully`)
    );

    /* ADD DATA ONE TIME*/
    // User.insertMany(users);
    // Event.insertMany(events);
    // Sponsor.insertMany(sponsors);
  })
  .catch((error) => console.log(`${error} did not connect`));
