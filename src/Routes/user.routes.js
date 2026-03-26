import { login, otpsend, refreshtokenController, signUp, testController,getUserData} from "../Controllers/user.controller.js";
import express from "express"
import asyncHandler from "../Middlewares/asyncHandler.js";
import { authCheck } from "../Middlewares/authCheck.js";
import { roleCheck } from "../Middlewares/roleCheck.js";
import { upload } from "../Service/storage.js"
import { authLimiter } from "../Utils/limiter.js";


const UserRoute = express.Router();

// SignUp
UserRoute.post("/signup",authLimiter,asyncHandler(signUp));

// OTP
UserRoute.post("/otp",authLimiter,asyncHandler(otpsend));

// Login
UserRoute.post("/login",authLimiter,asyncHandler(login))

// test
UserRoute.post("/test",authCheck,asyncHandler(testController))

// RefreshToken
UserRoute.post("/refreshToken", asyncHandler(refreshtokenController));

// GetJobs
UserRoute.get("/getjobs/:userId", asyncHandler(getUserData));




export default UserRoute;
