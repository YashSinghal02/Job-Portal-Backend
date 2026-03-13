import express from "express";
import { saveJob, getSavedJobs } from "../Controllers/savedjobs.controllers.js";
import { authCheck } from "../Middlewares/authCheck.js";
import asyncHandler from "../Middlewares/asyncHandler.js";

const SaveRoute = express.Router();

// Save a job
SaveRoute.post("/:jobid/save", authCheck, asyncHandler(saveJob));

// Get saved jobs
SaveRoute.get("/saved", authCheck, asyncHandler(getSavedJobs));

export default SaveRoute;