import mongoose from "mongoose";

const sponsorphoneNumberSchema = new mongoose.Schema({
  phoneNumber: {
    type: Number,
  },
});

const interestedthemesSchema = new mongoose.Schema({
  theme: {
    type: String,
  },
});
const SponsorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    sponsorName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    sponsorEmail: {
      type: String,
      required: true,
      max: 50,
    },
    sponsorpicturePath: {
      type: String,
      default: " ",
    },
    sponsorphoneNumber: [sponsorphoneNumberSchema],
    interestedtheme: [interestedthemesSchema],
    sponsorInfo: String,
    location: String,
    budget: Number,
    industry: String,
    sponsortwitterLink: String,
    sponsorlinkedinLink: String,
    sponsorCoordinator: String,
    likes: {
      type: Map,
      of: Boolean,
    },
  },
  { timestamps: true }
);

const Sponsor = mongoose.model("Sponsor", SponsorSchema);
export default Sponsor;
