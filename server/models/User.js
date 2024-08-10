import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
    },
    picturePath: {
      type: String,
      default: " ",
    },
    friends: {
      type: Array,
      default: [],
    },
    role: String,
    location: String,
    twitterLink: String,
    linkedinLink: String,
    phoneNumber: Number,
    viewedProfile: Number,
    impressions: Number,
    securityQuestion: {
      type: String,
    },
    securityAnswer: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
