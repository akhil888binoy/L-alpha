import mongoose from "mongoose";

const marketingPlanSchema = mongoose.Schema({
  budget: {
    type: Number,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const eventSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    eventName: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    eventLocation: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    eventPhoneNumber: {
      type: Number,
      required: true,
    },
    theme: String,
    location: String,
    description: String,
    bannerpicturePath: String,
    logopicturePath: String,
    userPicturePath: String,
    ticketSold: Number,
    likes: {
      type: Map,
      of: Boolean,
    },
    marketingPlans: [marketingPlanSchema], // Array of marketing plans
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
