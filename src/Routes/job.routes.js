import express from "express";
import { jobcardget, jobPost,deleteJob,editJob,getJobById,getAllJobs } from "../Controllers/jobcreated.controller.js";
import asyncHandler from "../Middlewares/asyncHandler.js";
import { authCheck } from "../Middlewares/authCheck.js";
import { upload } from "../Service/storage.js";
import { roleCheck } from "../Middlewares/roleCheck.js";
import { actionLimiter } from "../Utils/limiter.js";

const employerRoute=express.Router();

// jobcreate
employerRoute.post("/jobs/:userId",authCheck, roleCheck("employer"),actionLimiter, asyncHandler(jobPost));

// getAllJobs
employerRoute.get("/jobs", asyncHandler(getAllJobs));

// JOb Card get
// employerRoute.get("/jobs",asyncHandler(jobcardget));

// Job Delete
employerRoute.delete("/jobs/:jobid",authCheck, roleCheck("employer"),actionLimiter,asyncHandler(deleteJob));

// Job Edit
// employerRoute.put("/jobs/:jobid",authCheck,asyncHandler(editJob));
employerRoute.put("/jobs/:jobid", authCheck, roleCheck("employer"),actionLimiter, upload.single("logo"), asyncHandler(editJob));

// Get One Job By ID
employerRoute.get("/jobs/:id",asyncHandler(getJobById));



export default employerRoute
