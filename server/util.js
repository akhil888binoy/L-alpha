import crypto from "crypto";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export const generateResetToken = () => {
  return crypto.randomBytes(20).toString("hex");
};

export const sendResetEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    to: email,
    from: process.env.EMAIL_USER,
    subject: "Password Reset",
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
    Please click on the following link, or paste this into your browser to complete the process:\n\n
    ${process.env.CLIENT_URL}/reset-password/${token}\n\n
    If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };

  await transporter.sendMail(mailOptions);
};
