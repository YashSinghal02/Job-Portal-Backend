import express from "express";
import { saveJob, getSavedJobs } from "../Controllers/savedjobs.controllers.js";
import { authCheck } from "../Middlewares/authCheck.js";
import asyncHandler from "../Middlewares/asyncHandler.js";
import { roleCheck } from "../Middlewares/roleCheck.js";
import { actionLimiter } from "../Utils/limiter.js";


const SaveRoute = express.Router();

// Save a job
SaveRoute.post("/:jobid/save",actionLimiter, authCheck, roleCheck("employee"), asyncHandler(saveJob));

// Get saved jobs
SaveRoute.get("/saved", authCheck, roleCheck("employee"), asyncHandler(getSavedJobs));

export default SaveRoute;