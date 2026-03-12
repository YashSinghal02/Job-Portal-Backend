import { login, otpsend, refreshtokenController, signUp, testController, } from "../Controllers/user.controller.js";
import express from "express"
import asyncHandler from "../Middlewares/asyncHandler.js";
import { authCheck } from "../Middlewares/authCheck.js";
import { roleCheck } from "../Middlewares/roleCheck.js";


const UserRoute = express.Router();

// SignUp
UserRoute.post("/signup",asyncHandler(signUp));

// OTP
UserRoute.post("/otp",asyncHandler(otpsend));

// Login
UserRoute.post("/login",asyncHandler(login))

// test
UserRoute.post("/test",authCheck,asyncHandler(testController))

// RefreshToken
UserRoute.post("/refreshToken", asyncHandler(refreshtokenController));

export default UserRoute;
