import mongoose from "mongoose";

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
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
