import express from "express"
import { createProfile,getProfile,getProfileById,editProfile } from "../Controllers/profile.controller.js";
import asyncHandler from "../Middlewares/asyncHandler.js";


const ProfileRoute = express.Router();

// Create Profile
ProfileRoute.post("/",asyncHandler(createProfile));

// Get All Profiles
ProfileRoute.get("/", asyncHandler(getProfile));

// Get One Profile By Id
ProfileRoute.get("/:id", asyncHandler(getProfileById));

// Edit Profile
ProfileRoute.put("/:profileid", asyncHandler(editProfile));


export default ProfileRoute;