import express from "express"
import { createProfile,getProfile,getProfileById,editProfile } from "../Controllers/profile.controller.js";
import asyncHandler from "../Middlewares/asyncHandler.js";
import { authCheck } from "../Middlewares/authCheck.js";
import { roleCheck } from "../Middlewares/roleCheck.js";



const ProfileRoute = express.Router();

// Create Profile
ProfileRoute.post("/",authCheck, roleCheck("employee","employer"),asyncHandler(createProfile));

// Get All Profiles
ProfileRoute.get("/",authCheck, roleCheck("employee","employer"), asyncHandler(getProfile));

// Get One Profile By Id
ProfileRoute.get("/:profileid",authCheck, roleCheck("employee","employer"), asyncHandler(getProfileById));

// Edit Profile
ProfileRoute.put("/:profileid",authCheck, roleCheck("employee","employer"), asyncHandler(editProfile));


export default ProfileRoute;