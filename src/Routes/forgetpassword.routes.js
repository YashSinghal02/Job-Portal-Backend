import express from "express";
import asyncHandler from "../Middlewares/asyncHandler.js";
import {
  verifyemail,
  verifyotp,
  changepassword,
} from "../Controllers/forgetpassword.controller.js";
import { authLimiter } from "../Utils/limiter.js";

const ForgetRoute = express.Router();

// Verify Email
ForgetRoute.post("/verify-email", asyncHandler(verifyemail));

// Verify OTP
ForgetRoute.post("/verify-otp", asyncHandler(verifyotp));

// Change Password
ForgetRoute.post("/change-password",authLimiter, asyncHandler(changepassword));

export default ForgetRoute;