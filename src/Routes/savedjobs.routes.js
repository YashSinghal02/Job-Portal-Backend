import express from "express";
import { saveJob, getSavedJobs } from "../Controllers/savedjobs.controllers.js";
import { authCheck } from "../Middlewares/authCheck.js";
import asyncHandler from "../Middlewares/asyncHandler.js";
import { roleCheck } from "../Middlewares/roleCheck.js";


const SaveRoute = express.Router();

// Save a job
SaveRoute.post("/:jobid/save", authCheck, roleCheck("employee"), asyncHandler(saveJob));

// Get saved jobs
SaveRoute.get("/saved", authCheck, roleCheck("employee"), asyncHandler(getSavedJobs));

export default SaveRoute;