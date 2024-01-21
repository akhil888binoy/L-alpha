import mongoose from "mongoose";

const SponsorSchema = new mongoose.Schema(
  {
    sponsorName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    picturePath: {
      type: String,
      default: " ",
    },
    friends: {
      type: Array,
      default: [],
    },
    sponsorNumber: {
      type: Array,
      default: [],
    },
    reviews: {
      type: Array,
      default: [],
    },
    sponsoredEvent: {
      type: Array,
      default: [],
    },
    interestedTheme: {
      type: Array,
      default: [],
    },
    sponsorInfo: String,
    location: String,
    budget: Number,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

const Sponsor = mongoose.model("Sponsor ", SponsorSchema);
export default Sponsor;
